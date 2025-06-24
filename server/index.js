// Load environment variables
import dotenv from "dotenv";
dotenv.config();

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
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// ==================
// Middleware
// ==================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

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
// Swagger definition
// ==================
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Edu-Zone Backend API",
      version: "1.0.0",
      description: `
        Welcome to the Edu-Zone Backend API documentation.  
        This API serves as the backbone of the Edu-Zone platform, enabling features such as:
        
        - User registration, login, and role-based management  
        - Course creation, listing, and updates  
        - Educational benefit access and management  
        - Blog publishing and viewing
        - Many More Coming...
    
        All endpoints follow RESTful principles and return JSON responses.  
        JWT authentication is required for protected routes.
      `,
      contact: {
        name: "Edu-Zone Dev Team",
        email: "support@eduzone.com",
        url: "https://eduzone.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ==================
// Start Server
// ==================
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
