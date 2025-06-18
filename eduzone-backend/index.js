// Load environment variables
require("dotenv").config();

// Core modules
const path = require("path");

// Third-party modules
const express = require("express");
const cors = require("cors");

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Database
const connectToDatabase = require("./config/server");

// Route imports (grouped and clearly labeled)
const userRouter = require("./routes/users/user_router");
const benefitRouter = require("./routes/edu-benefits/edu_benefits");
const blogRouter = require("./routes/blog/blog_router");
const courseRoutes = require("./routes/course/course_router");
const aboutRouter = require("./routes/about/about_us_router");

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
  res.sendFile(path.join(__dirname, "docs.html"));
});
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "docs.html"));
});

// ==================
// API Routes
// ==================
app.use("/api/users", userRouter);
app.use("/api/benefits", benefitRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/courses", courseRoutes);
app.use("/api/about", aboutRouter);

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
