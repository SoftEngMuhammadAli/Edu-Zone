import express from "express";
const router = express.Router();
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} from "../../controllers/course/course_controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *         - category
 *         - duration
 *         - level
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         category:
 *           type: string
 *           enum: ["UI/UX", "Programming", "Marketing", "Soft skill", "Network", "Data Science", "Business", "Design"]
 *         views:
 *           type: number
 *           default: 0
 *         students:
 *           type: number
 *           default: 0
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           default: 1
 *         duration:
 *           type: string
 *         level:
 *           type: string
 *           enum: ["Beginner", "Intermediate", "Advanced"]
 *         user:
 *           type: string
 *           description: User ID (instructor)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         title: Introduction to Web Development
 *         description: Learn the basics of HTML, CSS, and JavaScript
 *         image: https://example.com/course.jpg
 *         category: Programming
 *         views: 120
 *         students: 45
 *         rating: 4.5
 *         duration: "4 weeks"
 *         level: Beginner
 *         user: "64e6a5f7829b30001c9d95b2"
 *         createdAt: "2024-05-01T10:30:00Z"
 *         updatedAt: "2024-05-02T08:00:00Z"
 */

/**
 * @swagger
 * /api/courses/all:
 *   get:
 *     summary: Retrieve all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/all", checkAuth, getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
router.get("/:id", checkAuth, getCourseById);

/**
 * @swagger
 * /api/courses/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post(
  "/create",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createCourse
);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateCourseById
);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  deleteCourseById
);

export default router;
