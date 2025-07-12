/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import status from 'http-status';
import { ZodError } from 'zod';
import { duplicateErrorRegex } from '../constant/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode: number = err?.statusCode || status.INTERNAL_SERVER_ERROR;
    let message: string = err?.message || 'Something went wrong';
    const error = err;

    let match: RegExpMatchArray | undefined;

    if (err instanceof ZodError || err?.name === 'ValidationError') {
        statusCode = status.UNPROCESSABLE_ENTITY;
        message = 'Validation Error';
    } else if (err?.name === 'CastError') {
        statusCode = status.BAD_REQUEST;
        message = 'Invalid ID';
    } else if ((match = err?.message.match(duplicateErrorRegex))) {
        statusCode = status.CONFLICT;
        message = `${match[2]} is already exits in ${match[1]}`;
    }

    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};

export default globalErrorHandler;
