import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use(errorHandler);

app.listen();
