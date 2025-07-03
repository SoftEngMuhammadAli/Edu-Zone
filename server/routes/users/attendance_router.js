import express from "express";
import {
  markAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../../controllers/auth/attendance_controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post(
  "/",
  checkAuth,
  authorizeRoles("instructor", "admin"),
  markAttendance
);

router.get(
  "/",
  checkAuth,
  authorizeRoles("instructor", "admin"),
  getAllAttendances
);

router.get(
  "/:id",
  checkAuth,
  authorizeRoles("instructor", "admin"),
  getAttendanceById
);

router.put(
  "/:id",
  checkAuth,
  authorizeRoles("instructor", "admin"),
  updateAttendance
);

router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("instructor", "admin"),
  deleteAttendance
);

export default router;
