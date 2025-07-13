import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
}
