import { RequestHandler } from "express";
import createHttpError from "http-errors";

const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user_id = req.session.user_id;
  if (user_id) {
    next();
  } else {
    next(createHttpError(401, "User not authenticated!"));
  }
};

export default isAuthenticated;
