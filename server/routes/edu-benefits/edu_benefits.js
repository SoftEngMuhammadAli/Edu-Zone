import express from "express";
const router = express.Router();
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";
import {
  handleBenefitByGetAll,
  handleBenefitById,
  createBenefit,
  handleUpdateBenefitById,
  handleDeleteBenefitById,
} from "../../controllers/edu-benefits/edu_benefits_controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Benefit:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: Numeric ID of the benefit (optional)
 *         title:
 *           type: string
 *           description: Title of the benefit
 *         description:
 *           type: string
 *           description: Description of the benefit
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 101
 *         title: Free Online Courses
 *         description: Access to premium educational content for free
 *         createdAt: "2024-05-01T10:30:00Z"
 *         updatedAt: "2024-05-01T10:45:00Z"
 */

/**
 * @swagger
 * /api/benefits/all:
 *   get:
 *     summary: Retrieve all education benefits
 *     tags: [Benefits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all education benefits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Benefit'
 */
router.get("/all", checkAuth, handleBenefitByGetAll);

/**
 * @swagger
 * /api/benefits/{id}:
 *   get:
 *     summary: Get a specific education benefit by ID
 *     tags: [Benefits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The benefit ID
 *     responses:
 *       200:
 *         description: Benefit found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Benefit'
 *       404:
 *         description: Benefit not found
 */
router.get("/:id", checkAuth, authorizeRoles("admin"), handleBenefitById);

/**
 * @swagger
 * /api/benefits/create:
 *   post:
 *     summary: Create a new education benefit
 *     tags: [Benefits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Benefit'
 *     responses:
 *       201:
 *         description: Benefit created successfully
 */
router.post("/create", checkAuth, authorizeRoles("admin"), createBenefit);

/**
 * @swagger
 * /api/benefits/{id}:
 *   put:
 *     summary: Update an existing education benefit
 *     tags: [Benefits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The benefit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Benefit'
 *     responses:
 *       200:
 *         description: Benefit updated successfully
 *       404:
 *         description: Benefit not found
 */
router.put("/:id", checkAuth, authorizeRoles("admin"), handleUpdateBenefitById);

/**
 * @swagger
 * /api/benefits/{id}:
 *   delete:
 *     summary: Delete an education benefit
 *     tags: [Benefits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The benefit ID
 *     responses:
 *       200:
 *         description: Benefit deleted successfully
 *       404:
 *         description: Benefit not found
 */
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  handleDeleteBenefitById
);

export default router;
