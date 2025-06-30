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

router.get("/all", checkAuth, getAllCourses);

router.get("/:id", checkAuth, getCourseById);

router.post(
  "/create",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createCourse
);

router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateCourseById
);

router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  deleteCourseById
);

export default router;
