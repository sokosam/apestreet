import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import getPool from "./database";
import env from "./utils/validEnv";
import userRoutes from "./routes/userRoutes";
import userStockRoutes from "./routes/userStocksRoute";
import { createTable } from "./utils/createTable";
import isAuthenticated from "./auth/auth";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const app = express();

app.use(
  session({
    secret: env.SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

// NOT FOR PRODUCTION:
// Development database creation:
createTable("USERBASE", env.DB_URI, [
  {
    // Primary key will override the other two as theres no need.
    column_name: "ID",
    primary_key: true,
    type: "INTEGER",
  },
  {
    column_name: "USERNAME",
    not_null: true,
    unique: false,
    type: "VARCHAR(50)",
  },
  {
    column_name: "EMAIL",
    not_null: true,
    unique: true,
    type: "VARCHAR(50)",
  },
  {
    column_name: "PASSWORD",
    not_null: true,
    unique: false,
    type: "VARCHAR(60)",
  },
]);

createTable("STOCK_WATCHLIST", env.DB_URI, [
  {
    column_name: "ID",
    primary_key: true,
    type: "INTEGER",
  },
  {
    column_name: "user_id",
    reference: "USERBASE(ID)",
    type: "INTEGER",
    onDelete: "CASCADE",
  },
  {
    column_name: "STOCK_SYMBOL",
    type: "VARCHAR(10)",
    not_null: true,
  },
  {
    column_name: "CREATED_AT",
    kwargs: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  },
]);

const client = getPool(env.DB_URI);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/userStocks", isAuthenticated, userStockRoutes);

app.listen(env.PORT, () => {
  console.log("Server is running on port " + env.PORT);
});

app.use(errorHandler);
