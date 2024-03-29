import { Request, Response, NextFunction, RequestHandler } from 'express'

export default function asyncWrapper(fn: RequestHandler) {
  return function(req: Request, res: Response, next: NextFunction) {
    try {
      fn(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}
