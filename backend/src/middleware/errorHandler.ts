import express, { NextFunction, Request, Response } from "express";

export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "An unknown error has occured!";
  if (typeof error === "number") {
    statusCode = error;
  }
  res.status(statusCode).json({ error: errorMessage });
}
