import express from "express";
import * as UserController from "../controllers/userController";

const router = express.Router();

router.post("/", UserController.createUser);

export default router;
