import express from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../../controllers/course/assignment_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.get("/", checkAuth, getAllAssignments);
router.get("/:id", checkAuth, getAssignmentById);
router.post("/", checkAuth, createAssignment);
router.put("/:id", checkAuth, updateAssignment);
router.delete("/:id", checkAuth, deleteAssignment);

export default router;
