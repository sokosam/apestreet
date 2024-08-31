import { RequestHandler } from "express";
import createHttpError from "http-errors";

const isAuthenticated: RequestHandler = async (req, res, next) => {
  const authenticatedId = req.session.userId;
  if (authenticatedId) {
    next();
  } else {
    next(createHttpError(401, "User not authenticated!"));
  }
};

export default isAuthenticated;
