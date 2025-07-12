import { NextFunction, Request, Response } from 'express';
import deleteFile from '../utils/deleteFile';
import ApiError from '../errors/ApiError';
import status from 'http-status';
import { ZodObject } from 'zod';

const validateRequestWithFileCleanup = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req?.body?.data) {
                throw new ApiError(status.BAD_REQUEST, 'Data is not provided');
            }
            const data = JSON.parse(req.body.data);
            req.body = await schema.parseAsync(data);
            next();
        } catch (error) {
            deleteFile(req?.file);
            next(error);
        }
    };
};

export default validateRequestWithFileCleanup;
