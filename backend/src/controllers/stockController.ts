import { json, RequestHandler } from "express";
import getPool from "../database";
import env from "../utils/validEnv";
import createHttpError from "http-errors";

const getDBClient = async () => {
  const client = await getPool(env.DB_URI);
  if (!client) {
    throw createHttpError(500, "Something went wrong connecting to Datebase!.");
  }
  return client;
};

export const getStockWatchList: RequestHandler = async (req, res, next) => {
  const user_id = req.session.user_id;
  const query = `SELECT * FROM STOCK_WATCHLIST WHERE 1=1 AND user_id = $1`;
  try {
    const client = await getDBClient();

    const response = await client.query(query, [user_id]);

    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

interface ChangeStockBody {
  stock_symbol: string;
}

export const createUserStock: RequestHandler<
  unknown,
  unknown,
  ChangeStockBody,
  unknown
> = async (req, res, next) => {
  const user_id = req.session.user_id;
  const stock_symbol = req.body.stock_symbol;
  const query = `INSERT INTO stock_watchlist ("user_id", "stock_symbol") VALUES ($1, $2);`;
  const checkExist = `SELECT COUNT(*) FROM stock_watchlist WHERE 1=1 AND (stock_symbol = $1 AND user_id = $2)`;
  try {
    const client = await getDBClient();

    const check = await client.query(checkExist, [stock_symbol, user_id]);

    if (!check) {
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!."
      );
    }
    if (check.rows[0]["count"] != "0") {
      throw createHttpError(409, "Already exists.");
    }

    const result = await client.query(query, [user_id, stock_symbol]);

    res.status(200).send("Successfully created user stock!");
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const deleteStock: RequestHandler<
  unknown,
  unknown,
  ChangeStockBody,
  unknown
> = async (req, res, next) => {
  const user_id = req.session.user_id;
  const stock_symbol = req.body.stock_symbol;
  const query = `DELETE FROM stock_watchlist WHERE 1=1 AND stock_symbol = $1 AND user_id = $2`;
  const checkExist = `SELECT COUNT(*) FROM stock_watchlist WHERE 1=1 AND (stock_symbol = $1 AND user_id = $2)`;
  try {
    const client = await getDBClient();

    const check = await client.query(checkExist, [stock_symbol, user_id]);

    if (!check) {
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!."
      );
    }
    if (check.rows[0]["count"] == "0") {
      throw createHttpError(409, "Stock is not currently in the watchlist!");
    }

    const result = await client.query(query, [stock_symbol, user_id]);

    res.status(200).send("Successfully deleted user stock!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// export const;
