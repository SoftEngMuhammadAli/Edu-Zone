import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/auth_controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user
 *       example:
 *         name: Your Name
 *         email: Your Email
 *         password: Your Password

 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       example:
 *         email: Your Email
 *         password: Your Password
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, missing fields or user already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogOutUser'
 *     responses:
 *       200:
 *         description: User logged Out successfully
 *       500:
 *         description: Internal server error
 */
router.post("/logout", logoutUser);

export default router;
