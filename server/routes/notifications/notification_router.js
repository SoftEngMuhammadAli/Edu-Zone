import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
} from "../../controllers/notifications/notification_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createNotification);
router.get("/:userId", checkAuth, getNotificationsByUser);
router.put("/:id/read", checkAuth, markNotificationAsRead);

export default router;

/*

import Notification from "../../models/notification_model.js";

// After course creation
await Notification.create({
  userId: targetUserId,
  message: `New course "${course.title}" has been published.`,
  type: "course",
  link: `/courses/${course._id}`,
});

*/
