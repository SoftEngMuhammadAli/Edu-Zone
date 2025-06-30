import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Edu-Zone Backend",
      version: "1.0.0",
      description: "Welcome to the Edu-Zone Backend API documentation.",
      contact: {
        name: "Edu-Zone Dev Team",
        email: "email@gmail.com",
        url: "https://www.website.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "API endpoints for user authentication and authorization",
      },
      {
        name: "User",
        description:
          "User management APIs for creating, reading, updating, and deleting users",
      },
      {
        name: "Todo",
        description:
          "API endpoints for managing todo items, including creation, retrieval, update, and deletion",
      },
      {
        name: "Courses",
        description:
          "Course management APIs for creating, reading, updating, and deleting courses",
      },
      {
        name: "Blogs",
        description:
          "API endpoints for managing blog posts, including creation, retrieval, update, and deletion",
      },
      {
        name: "Contact",
        description:
          "API endpoint for submitting contact inquiries and getting in touch with the team",
      },
      {
        name: "Privacy Policy",
        description:
          "API endpoint for retrieving privacy policy information and related content",
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
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

const swaggerServe = swaggerUi.serve;

const swaggerSetup = swaggerUi.setup(swaggerDocs, {
  customSiteTitle: "Edu-Zone API Docs",
  layout: "StandaloneLayout",
  explorer: true,
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info h1 { color: #007bff; }
  `,
});

export { swaggerServe, swaggerSetup };
