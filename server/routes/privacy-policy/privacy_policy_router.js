import express from "express";
const router = express.Router();
import {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../../controllers/privacy-policy/privacy_policy_controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

/**
 * @swagger
 * tags:
 *   name: Privacy Policy
 *   description: Manage Privacy Policy content
 */

/**
 * @swagger
 * /api/privacy-policy:
 *   get:
 *     summary: Get the current privacy policy
 *     tags: [Privacy Policy]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the current privacy policy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 policy:
 *                   type: string
 *                   example: This is the privacy policy content.
 *       401:
 *         description: Unauthorized
 */
router.get("/", checkAuth, getPrivacyPolicy);

/**
 * @swagger
 * /api/privacy-policy:
 *   post:
 *     summary: Create a new privacy policy
 *     tags: [Privacy Policy]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - policy
 *             properties:
 *               policy:
 *                 type: string
 *                 example: This is the new privacy policy content.
 *     responses:
 *       201:
 *         description: Privacy policy created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.post("/", checkAuth, authorizeRoles("admin"), createPrivacyPolicy);

/**
 * @swagger
 * /api/privacy-policy/{id}:
 *   put:
 *     summary: Update an existing privacy policy
 *     tags: [Privacy Policy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the privacy policy to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policy:
 *                 type: string
 *                 example: Updated privacy policy content.
 *     responses:
 *       200:
 *         description: Privacy policy updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Policy not found
 */
router.put("/:id", checkAuth, authorizeRoles("admin"), updatePrivacyPolicy);

/**
 * @swagger
 * /api/privacy-policy/{id}:
 *   delete:
 *     summary: Delete a privacy policy
 *     tags: [Privacy Policy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the privacy policy to delete
 *     responses:
 *       200:
 *         description: Privacy policy deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Policy not found
 */
router.delete("/:id", checkAuth, authorizeRoles("admin"), deletePrivacyPolicy);

export default router;
