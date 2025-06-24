import express from "express";
const router = express.Router();

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
 *         title:
 *           type: string
 *           description: Title of the benefit
 *         description:
 *           type: string
 *           description: Description of the benefit
 *       example:
 *         title: Free Online Courses
 *         description: Access to premium educational content for free
 */

/**
 * @swagger
 * /api/benefits/all:
 *   get:
 *     summary: Retrieve all education benefits
 *     tags: [Benefits]
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
router.get("/all", handleBenefitByGetAll);

/**
 * @swagger
 * /api/benefits/{id}:
 *   get:
 *     summary: Get a specific education benefit by ID
 *     tags: [Benefits]
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
router.get("/:id", handleBenefitById);

/**
 * @swagger
 * /api/benefits/create:
 *   post:
 *     summary: Create a new education benefit
 *     tags: [Benefits]
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
router.post("/create", createBenefit);

/**
 * @swagger
 * /api/benefits/{id}:
 *   put:
 *     summary: Update an existing education benefit
 *     tags: [Benefits]
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
router.put("/:id", handleUpdateBenefitById);

/**
 * @swagger
 * /api/benefits/{id}:
 *   delete:
 *     summary: Delete an education benefit
 *     tags: [Benefits]
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
router.delete("/:id", handleDeleteBenefitById);

export default router;
