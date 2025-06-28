import express from "express";
import { sendContactMessage } from "../../controllers/contact-us/contact_us_controller.js";

const router = express.Router();
router.post("/send-message", sendContactMessage);

export default router;
