import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/auth_controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
