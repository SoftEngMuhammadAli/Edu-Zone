import express from "express";
const router = express.Router();
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} from "../../controllers/course/course_controller.js";

router.get("/all", getAllCourses);

router.get("/:id", getCourseById);

router.post("/create", createCourse);

router.put("/:id", updateCourseById);

router.delete("/:id", deleteCourseById);

export default router;
