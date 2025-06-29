// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const PORT = process.env.PORT || 3000;

// ==================
// Database Connection
// ==================
import connectToDatabase from "./config/server.js";

// ==================
// Route Imports
// ==================
import userRouter from "./routes/users/user_router.js";
import benefitRouter from "./routes/edu-benefits/edu_benefits.js";
import blogRouter from "./routes/blog/blog_router.js";
import courseRoutes from "./routes/course/course_router.js";
import authRouter from "./routes/auth/auth_router.js";
import contactRouter from "./routes/contact-us/contact_us_router.js";
import privacyPolicyRouter from "./routes/privacy-policy/privacy_policy_router.js";

// ==================
// Middleware
// ==================
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

// ==================
// API Routes
// ==================
app.use("/api/users", userRouter);
app.use("/api/benefits", benefitRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/privacy-policy", privacyPolicyRouter);

// ==================
// Swagger Setup
// ==================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Edu-Zone Backend",
      version: "1.0.0",
      description: `
        Welcome to the Edu-Zone Backend API documentation.

        This API enables features such as:
        - User registration, login, and role-based management  
        - Course creation, listing, and updates  
        - Educational benefit access and management  
        - Blog publishing and viewing  
        - And more...

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
        url: "https://eduzone-jscm.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customSiteTitle: "Edu-Zone API Docs",
    layout: "StandaloneLayout", // <- updated layout
    explorer: true, // <- added search functionality
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info h1 { color: #007bff; }
    `,
  })
);

// ==================
// Start Server
// ==================
connectToDatabase(process.env.DB_CONFIGURATION);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
