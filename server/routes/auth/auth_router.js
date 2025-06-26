import express from "express";
import {
  loginUser,
  registerUser,
} from "../../controllers/auth/auth_controller.js";
const router = express.Router();

// signup
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

export default router;
