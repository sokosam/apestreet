import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import getPool from "./database";
import env from "./utils/validEnv";
import userRoutes from "./routes/userRoutes";

const app = express();

const client = getPool(env.DB_URI);

app.use(express.json());

app.listen(env.PORT, () => {
  console.log("Server is running on port " + env.PORT);
});

app.use("/api/users", userRoutes);

app.use(errorHandler);
