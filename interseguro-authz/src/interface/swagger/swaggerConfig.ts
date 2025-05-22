import swaggerJsdoc from "swagger-jsdoc";

/**
 * Swagger configuration options
 */
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interseguro Authz API",
      version: "1.0.0",
      description:
        "API for authenticating users and validating tokens in the Interseguro system.",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3003",
        description: "Development server",
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
  apis: ["./dist/interface/**/*.js", "./src/interface/**/*.ts"], // Path to the API docs
};

/**
 * Swagger specification
 */
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
