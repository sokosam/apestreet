import { RequestHandler } from "express";
import getClient from "../database";
import env from "../utils/validEnv";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

const getDBClient = async () => {
  const client = await getClient(env.DB_URI);
  if (!client) {
    throw createHttpError(500, "Something went wrong connecting to Datebase!.");
  }
  return client;
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const client = await getDBClient();
    const response = await client.query(
      "SELECT id, username, email FROM USERBASE WHERE 1=1 AND (id = $1)",
      [req.session.user_id]
    );
    if (!response) {
      await client.end();
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!"
      );
    } else if (response.rowCount == 0) {
      await client.end();
      throw createHttpError(401, "Unauthorized");
    }
    res
      .status(200)
      .header({ "Access-Control-Allow-Credentials": true })
      .json(response.rows[0]);

    await client.end();

    // res.status(200).json({user_id.rows[0]["id"]})
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
  //May be inefficient, check on this later.
  const queryCheckExist =
    "SELECT COUNT(*) FROM USERBASE WHERE 1=1 AND (username = $1 OR email =$2)";
  const query = `INSERT INTO USERBASE ("username", "email", "password") VALUES ($1, $2, $3);`;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing!");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const client = await getDBClient();

    const check = await client.query(queryCheckExist, [username, email]);
    if (!check) {
      await client.end();
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!."
      );
    }

    if (check.rows[0]["count"] != "0") {
      throw createHttpError(409, "Username or Email already registered.");
    }

    const result = await client.query(query, [username, email, passwordHashed]);

    const user_id = await client.query(
      "SELECT id,email FROM USERBASE WHERE 1=1 AND (username = $1)",
      [username]
    );
    if (!user_id) {
      await client.end();
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!"
      );
    }

    req.session.user_id = user_id.rows[0]["id"];
    req.session.username = username;
    req.session.email = user_id.rows[0]["email"];

    res
      .status(200)
      .header({ "Access-Control-Allow-Credentials": true })
      .json({ username: username, id: user_id.rows[0]["id"], email: email });

    await client.end();
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

    const client = await getDBClient();
    const check = await client.query(query, [username]);
    if (check) {
      if (
        check.rowCount == 0 ||
        !(await bcrypt.compare(passwordRaw, check.rows[0]["password"]))
      ) {
        await client.end();
        throw createHttpError(401, "Invalid credentials!");
      }
    }

    const user_id = await client.query(
      "SELECT id,email FROM USERBASE WHERE 1=1 AND (username = $1)",
      [username]
    );
    if (!user_id) {
      await client.end();
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!."
      );
    }
    req.session.user_id = user_id.rows[0]["id"];
    req.session.username = username;
    req.session.email = user_id.rows[0]["email"];

    res.status(201).header({ "Access-Control-Allow-Credentials": true }).json({
      username: username,
      user_id: user_id.rows[0]["id"],
      email: user_id.rows[0]["email"],
    });

    await client.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      next(error);
    } else {
      res.clearCookie("connect.sid");
      res.sendStatus(200);
    }
  });
};

export const getPublicUser: RequestHandler = async (req, res, next) => {
  const username = req.body.username;
  const queryCheckExist =
    "SELECT COUNT(*) FROM USERBASE WHERE 1=1 AND (username = $1)";

  try {
    const client = await getDBClient();
    const check = await client.query(queryCheckExist, [username]);

    if (!check) {
      await client.end();
      throw createHttpError(
        500,
        "Something went wrong connecting to Datebase!."
      );
    }

    if (check.rows[0]["count"] == "0") {
      throw createHttpError(409, "User doesn't exist!");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
