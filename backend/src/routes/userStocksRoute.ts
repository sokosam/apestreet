import express from "express";
import isAuthenticated from "../auth/auth";
import {
  createUserStock,
  deleteStock,
  getPublicStockWatchlist,
  getStockWatchList,
} from "../controllers/stockController";

const router = express.Router();

router.post("/create", isAuthenticated, createUserStock);

router.post("/delete", isAuthenticated, deleteStock);

router.get("/", isAuthenticated, getStockWatchList);

router.get("/:username", getPublicStockWatchlist);

export default router;
