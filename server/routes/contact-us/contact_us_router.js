import express from "express";
const router = express.Router();
import { sendContactMessage } from "../../controllers/contact-us/contact_us_controller.js";

router.post("/send-message", sendContactMessage);

export default router;
