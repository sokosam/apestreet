import { RequestHandler } from "express";

export const getStockWatchList: RequestHandler = async (req, res, next) => {
  const authenticaedId = req.session.userId
  const query = 
  try {

  } catch (error) {
    next(error);
  }
};
