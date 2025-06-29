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
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               message:
 *                 type: string
 *                 example: I need help with my course registration.
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
