import userRouter from "../routes/users/user_router.js";
import benefitRouter from "../routes/edu-benefits/edu_benefits.js";
import blogRouter from "../routes/blog/blog_router.js";
import courseRouter from "../routes/course/course_router.js";
import authRouter from "../routes/auth/auth_router.js";
import contactRouter from "../routes/contact-us/contact_us_router.js";
import privacyPolicyRouter from "../routes/privacy-policy/privacy_policy_router.js";
import todoRouter from "../routes/todo/todo_router.js";
import termsConditionsRouter from "../routes/terms-conditions/terms_conditions_router.js";
import ratingRouter from "../routes/rating/rating_router.js";
import commentRouter from "../routes/post-interactions/comments_router.js";
import likeRouter from "../routes/post-interactions/likes_router.js";
import lessonRouter from "../routes/course/lessons_router.js";
import assignmentRouter from "../routes/course/assignment_router.js";
import attendanceRouter from "../routes/users/attendance_router.js";

const registeredRouters = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/benefits", benefitRouter);
  app.use("/api/blogs", blogRouter);
  app.use("/api/courses", courseRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api/privacy-policy", privacyPolicyRouter);
  app.use("/api/todos", todoRouter);
  app.use("/api/terms-conditions", termsConditionsRouter);
  app.use("/api/ratings", ratingRouter);
  app.use("/api/comments", commentRouter);
  app.use("/api/likes", likeRouter);
  app.use("/api/lessons", lessonRouter);
  app.use("/api/assignments", assignmentRouter);
  app.use("/api/attendance", attendanceRouter);
};

export default registeredRouters;
