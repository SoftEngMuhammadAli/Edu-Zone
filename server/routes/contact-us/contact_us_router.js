import express from "express";
const router = express.Router();
import { sendContactMessage } from "../../controllers/contact-us/contact_us_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

router.post("/send-message", checkAuth, sendContactMessage);

export default router;
