import { Request, Response, NextFunction, RequestHandler } from 'express';
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const asyncWrapper: (handler: AsyncRequestHandler) => RequestHandler;
export {};
