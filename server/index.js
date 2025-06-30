import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;

// DB
import connectToDatabase from "./config/server.js";

// Routers
import userRouter from "./routes/users/user_router.js";
import benefitRouter from "./routes/edu-benefits/edu_benefits.js";
import blogRouter from "./routes/blog/blog_router.js";
import courseRoutes from "./routes/course/course_router.js";
import authRouter from "./routes/auth/auth_router.js";
import contactRouter from "./routes/contact-us/contact_us_router.js";
import privacyPolicyRouter from "./routes/privacy-policy/privacy_policy_router.js";
import todoRouter from "./routes/todo/todo_router.js";

// Swagger
import { swaggerServe, swaggerSetup } from "./swagger.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

// Routes
app.use("/api/users", userRouter);
app.use("/api/benefits", benefitRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/privacy-policy", privacyPolicyRouter);
app.use("/api/todos", todoRouter);

// Swagger Docs Route
app.use("/api-docs", swaggerServe, swaggerSetup);

// Start server
connectToDatabase(process.env.DB_CONFIGURATION);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
