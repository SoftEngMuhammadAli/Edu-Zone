// ==========================
// User-related Routers
// ==========================
import userRouter from "../routes/users/user_router.js";
import attendanceRouter from "../routes/users/attendance_router.js";

// ==========================
// Auth Routers
// ==========================
import authRouter from "../routes/auth/auth_router.js";

// ==========================
// Course-related Routers
// ==========================
import courseRouter from "../routes/course/course_router.js";
import lessonRouter from "../routes/course/lessons_router.js";
import assignmentRouter from "../routes/course/assignment_router.js";

// ==========================
// Educational Benefits
// ==========================
import benefitRouter from "../routes/edu-benefits/edu_benefits.js";

// ==========================
// Blog Routers
// ==========================
import blogRouter from "../routes/blog/blog_router.js";

// ==========================
// Post Interactions
// ==========================
import commentRouter from "../routes/post-interactions/comments_router.js";
import likeRouter from "../routes/post-interactions/likes_router.js";
import ratingRouter from "../routes/rating/rating_router.js";

// ==========================
// Contact & Info
// ==========================
import contactRouter from "../routes/contact-us/contact_us_router.js";
import privacyPolicyRouter from "../routes/privacy-policy/privacy_policy_router.js";
import termsConditionsRouter from "../routes/terms-conditions/terms_conditions_router.js";

// ==========================
// Utility Routers
// ==========================
import todoRouter from "../routes/todo/todo_router.js";

// ==========================
// Notifications
// ==========================
import notificationRouter from "../routes/notifications/notification_router.js";

const registeredRouters = (app) => {
  // User
  app.use("/api/users", userRouter);
  app.use("/api/attendance", attendanceRouter);

  // Auth
  app.use("/api/auth", authRouter);

  // Courses
  app.use("/api/courses", courseRouter);
  app.use("/api/lessons", lessonRouter);
  app.use("/api/assignments", assignmentRouter);

  // Educational Benefits
  app.use("/api/benefits", benefitRouter);

  // Blog
  app.use("/api/blogs", blogRouter);

  // Post Interactions
  app.use("/api/comments", commentRouter);
  app.use("/api/likes", likeRouter);
  app.use("/api/ratings", ratingRouter);

  // Contact & Info
  app.use("/api/contact", contactRouter);
  app.use("/api/privacy-policy", privacyPolicyRouter);
  app.use("/api/terms-conditions", termsConditionsRouter);

  // Utilities
  app.use("/api/todos", todoRouter);

  // Notifications
  app.use("/api/notifications", notificationRouter);
};

export default registeredRouters;
