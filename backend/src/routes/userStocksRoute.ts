import express from "express";
import {
  createUserStock,
  deleteStock,
  getStockWatchList,
} from "../controllers/stockController";

const router = express.Router();

router.post("/create", createUserStock);

router.post("/delete", deleteStock);

export default router;
