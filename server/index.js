// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Core modules
import path from "path";

// Third-party modules
import express from "express";
import cors from "cors";

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Database
import connectToDatabase from "./config/server.js";

// Route imports (grouped and clearly labeled)
import userRouter from "./routes/users/user_router.js";
import benefitRouter from "./routes/edu-benefits/edu_benefits.js";
import blogRouter from "./routes/blog/blog_router.js";
import courseRoutes from "./routes/course/course_router.js";

// ==================
// Middleware
// ==================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

// ==================
// Static Routes
// ==================
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "docs.html"));
});
app.get("/docs", (req, res) => {
  res.sendFile(path.join(process.cwd(), "docs.html"));
});

// ==================
// API Routes
// ==================
app.use("/api/users", userRouter);
app.use("/api/benefits", benefitRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/courses", courseRoutes);

// ==================
// Database Connection
// ==================
const uri =
  process.env.DB_CONFIGURATION ||
  `mongodb://localhost:27017/${process.env.DEVELOPMENT_DATABASE_NAME}`;
connectToDatabase(uri);

// ==================
// Start Server
// ==================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
