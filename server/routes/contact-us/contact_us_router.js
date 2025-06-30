import express from "express";
const router = express.Router();
import { sendContactMessage } from "../../controllers/contact-us/contact_us_controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactMessage:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         fullname:
 *           type: string
 *           description: Full name of the sender
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Sender's email address
 *           example: johndoe@example.com
 *         subject:
 *           type: string
 *           description: Subject of the message
 *           example: Issue with registration
 *         message:
 *           type: string
 *           description: The message content
 *           example: I need help with my course registration.
 */

/**
 * @swagger
 * /api/contact/send-message:
 *   post:
 *     summary: Send a contact message to the support team
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactMessage'
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Contact message sent.
 *       400:
 *         description: Bad request (e.g., missing fields)
 *       500:
 *         description: Internal server error
 */
router.post("/send-message", sendContactMessage);

export default router;
