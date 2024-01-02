import { Request, Response, NextFunction, RequestHandler } from 'express';
export default function asyncWrapper(fn: RequestHandler): (req: Request, res: Response, next: NextFunction) => void;
