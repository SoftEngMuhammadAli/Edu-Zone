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
import {
  handleGetAllCourseCategories,
  handleGetCourseCategoryById,
  createCourseCategory,
  handleUpdateCourseCategoryById,
  handleDeleteCourseCategoryById,
} from "../../controllers/course/course_category_controller.js";

//--///////////////////////////////////////////////
// Course Routers
//--///////////////////////////////////////////////
router.get("/", checkAuth, getAllCourses);
router.get("/:id", checkAuth, getCourseById);
router.post(
  "/",
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

//--///////////////////////////////////////////////
// Course Categories Routers
//--///////////////////////////////////////////////
router.get("/categories", checkAuth, handleGetAllCourseCategories);
router.get("/categories/:id", checkAuth, handleGetCourseCategoryById);
router.post(
  "/categories",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createCourseCategory
);
router.put(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleUpdateCourseCategoryById
);
router.delete(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleDeleteCourseCategoryById
);

export default router;
