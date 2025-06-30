import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
