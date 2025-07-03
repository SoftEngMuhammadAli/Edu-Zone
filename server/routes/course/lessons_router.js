import express from "express";
import {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../../controllers/course/lesson_controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.get("/", checkAuth, getAllLessons);
router.get("/:id", checkAuth, getLessonById);
router.post(
  "/",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createLesson
);
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateLesson
);
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  deleteLesson
);

export default router;
