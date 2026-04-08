import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wraps an async Express route handler, catching any rejected promises
 * and passing them automatically to `next()`.
 * 
 * This prevents the need for writing boilerplate `try/catch` blocks
 * inside every single controller.
 */

const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


export default catchAsync;