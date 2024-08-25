import { RequestHandler } from "express";
import getPool from "../database";
import env from "../utils/validEnv";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface SignUpUserBody {
  username?: string;
  email?: string;
  password?: string;
}

//TODO: remove case sensitivity for usernames
export const signUpUser: RequestHandler<
  unknown,
  unknown,
  SignUpUserBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const passwordRaw = req.body.password;
  const email = req.body.email;
  const queryCheckExist =
    "SELECT COUNT(*) FROM USERBASE WHERE 1=1 AND (username = $1 OR email =$2)";
  const query = `INSERT INTO USERBASE ("username", "email", "password") VALUES ($1, $2, $3)`;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing!");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const client = await getPool(env.DB_URI);
    if (client) {
      const check = await client.query(queryCheckExist, [username, email]);

      if (check) {
        if (check.rows[0]["count"] == "0") {
        } else {
          throw createHttpError(409, "Username or Email already registered.");
        }
      } else {
        throw createHttpError(
          500,
          "Something went wrong connecting to Datebase!."
        );
      }

      const result = await client.query(query, [
        username,
        email,
        passwordHashed,
      ]);

      res.status(200).send("Successfully added user");
    } else {
      throw createHttpError(500, "Something went wrong inserting!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const passwordRaw = req.body.password;

  let query = "SELECT password FROM USERBASE WHERE 1=1 AND (username = $1)";

  try {
    if (!username || !passwordRaw) {
      throw createHttpError(400, "Parameters missing!");
    }

    const client = await getPool(env.DB_URI);
    if (!client) throw createHttpError(401, "Invalid credentials!");

    const check = await client.query(query, [username]);
    if (check) {
      if (check.rowCount == 0)
        throw createHttpError(401, "Invalid credentials!");
      else if (
        !(await bcrypt.compare(passwordRaw, check.rows[0]["password"]))
      ) {
        throw createHttpError(401, "Invalid credentials!");
      }
    }

    res.status(201).send("loggedIn");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
