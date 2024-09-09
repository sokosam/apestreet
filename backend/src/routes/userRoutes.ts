import express from "express";
import * as UserController from "../controllers/userController";

const router = express.Router();

router.post("/signUp", UserController.signUpUser);

router.post("/login", UserController.login);

router.get("/", UserController.getAuthenticatedUser);

router.post("/logout", UserController.logout);
router.get("/:username", UserController.checkUserExists);

export default router;
