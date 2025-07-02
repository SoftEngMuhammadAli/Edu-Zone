import express from "express";
import {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../../controllers/course/lesson_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createLesson);
router.get("/", checkAuth, getAllLessons);
router.get("/:id", checkAuth, getLessonById);
router.put("/:id", checkAuth, updateLesson);
router.delete("/:id", checkAuth, deleteLesson);

export default router;
