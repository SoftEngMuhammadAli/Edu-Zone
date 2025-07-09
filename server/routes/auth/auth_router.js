import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
} from "../../controllers/auth/auth_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", checkAuth, getUserProfile);

export default router;
