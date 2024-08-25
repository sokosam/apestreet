import { RequestHandler } from "express";
import getPool from "../database";
import env from "../utils/validEnv";
import createHttpError from "http-errors";

interface createUserBody {
  username: string;
}

export const createUser: RequestHandler<
  unknown,
  unknown,
  createUserBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const query = `INSERT INTO test ("USER_MODEL") VALUES ($1)`;
  try {
    if (!username) {
      throw createHttpError(401, "Username not found!");
    }
    const client = await getPool(env.DB_URI);
    if (client) {
      const result = await client.query(query, [username]);
      res.status(200).json(result);
    } else {
      throw createHttpError(401, "Something went wrong inserting!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
