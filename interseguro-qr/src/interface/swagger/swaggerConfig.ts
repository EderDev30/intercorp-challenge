import swaggerJsdoc from "swagger-jsdoc";

/**
 * Swagger configuration options
 */
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interseguro QR Factorization API",
      version: "1.0.0",
      description: "API for performing QR factorization on matrices",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./dist/interface/**/*.js", "./src/interface/**/*.ts"], // Path to the API docs
};

/**
 * Swagger specification
 */
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
