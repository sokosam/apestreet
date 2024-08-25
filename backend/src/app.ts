import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import getPool from "./database";
import env from "./utils/validEnv";
import userRoutes from "./routes/userRoutes";
import { createColumnProps, createTable } from "./utils/createTable";

const app = express();

// NOT FOR PRODUCTION:
// Development database creation:
createTable("USERBASE", env.DB_URI, [
  {
    column_name: "ID",
    not_null: true,
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

const client = getPool(env.DB_URI);

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(env.PORT, () => {
  console.log("Server is running on port " + env.PORT);
});

app.use(errorHandler);
