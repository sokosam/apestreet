import express from "express";
import * as UserController from "../controllers/userController";
import isAuthenticated from "../auth/auth";

const router = express.Router();

router.post("/signUp", UserController.signUpUser);

router.post("/login", UserController.login);

router.get("/", UserController.getAuthenticatedUser);

router.post("/logout", UserController.logout);
router.get("/:username", UserController.checkUserExists);

router.patch(
  "/description",
  isAuthenticated,
  UserController.editUserProfileDescription
);

router.post("/description/get", UserController.getUserProfileDescription);

export default router;
