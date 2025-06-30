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
 *
 * components:
 *   schemas:
 *     PrivacyPolicy:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           example: Privacy Policy Title
 *         content:
 *           type: string
 *           example: This is the privacy policy content.
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *                 message:
 *                   type: string
 *                   example: Policy fetched successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PrivacyPolicy'
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
 *             $ref: '#/components/schemas/PrivacyPolicy'
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
 *             $ref: '#/components/schemas/PrivacyPolicy'
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
