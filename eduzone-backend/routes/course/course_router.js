const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} = require("../../controllers/course/course_controller");

router.get("/all", getAllCourses);

router.get("/:id", getCourseById);

router.post("/create", createCourse);

router.put("/:id", updateCourseById);

router.delete("/:id", deleteCourseById);

module.exports = router;
