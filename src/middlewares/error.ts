/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
  error: Error & ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (!error.statusCode || error.statusCode == 500) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res
    .status(error.statusCode)
    .json({ message: error.message, metadata: error.metadata });
};
