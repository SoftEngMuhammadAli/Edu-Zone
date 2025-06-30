import express from "express";
const router = express.Router();
import {checkAuth,authorizeRoles} from "../../middlewares/auth/auth_middleware.js";
import {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
} from "../../controllers/blog/blog_controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: The blog's title
 *         content:
 *           type: string
 *           description: The main content of the blog
 *         author:
 *           type: string
 *           description: The name of the blog's author
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date of the blog
 *       example:
 *         title: 10 Tips for Learning JavaScript
 *         content: JavaScript is a powerful language...
 *         author: John Doe
 *         createdAt: 2024-05-01T10:30:00Z
 */

/**
 * @swagger
 * /api/blogs/all:
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get("/all", checkAuth, handleGetAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get("/:id", checkAuth, handleGetBlogById);

/**
 * @swagger
 * /api/blogs/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.post(
  "/create",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleCreateBlog
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleUpdateBlogById
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleDeleteBlogById
);

export default router;
