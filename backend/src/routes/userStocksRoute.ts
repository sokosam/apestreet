import express from "express";
import {
  createUserStock,
  deleteStock,
  getStockWatchList,
  getPublicStockWatchlist,
} from "../controllers/stockController";
import isAuthenticated from "../auth/auth";

const router = express.Router();

router.post("/create", isAuthenticated, createUserStock);

router.post("/delete", isAuthenticated, deleteStock);

router.get("/", isAuthenticated, getStockWatchList);

router.get("/:username", getPublicStockWatchlist);

export default router;
