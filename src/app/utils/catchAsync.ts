import { NextFunction, Request, RequestHandler, Response } from 'express';
import deleteFile from './deleteFile';

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            deleteFile(req?.file);
            next(error);
        }
    };
};

export default catchAsync;
