require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./config/server");
const userRouter = require("./routes/users/user_router");
const benefitRouter = require("./routes/edu-benefits/edu_benefits");
const blogRouter = require("./routes/blog/blog_router");
const courseRoutes = require("./routes/course/course_router");

app.use(express.json());
app.use(express.urlencoded());
app.set("json spaces", 2);

// API DOCS at / Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "docs.html"));
});

// API DOCS at /docs Route
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "docs.html"));
});

// Mount user routes
app.use("/api/users", userRouter);
// Eduzone benefits Route
app.use("/api/benefits", benefitRouter);
// Blog Router
app.use("/api/blogs", blogRouter);
// Course Router
app.use("/api/courses", courseRoutes);

const uri =
  process.env.DB_CONFIGURATION ||
  `mongodb://localhost:27017/${process.env.DEVELOPMENT_DATABASE_NAME}`;
connectToDatabase(uri);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
