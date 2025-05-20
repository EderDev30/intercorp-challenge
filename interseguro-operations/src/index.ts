// External dependencies
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

// Application layer
import { MatrixOperationsUseCase } from "./application/matrix/matrixOperationsUseCase.js";

// Infrastructure layer
import { MatrixService } from "./infrastructure/matrix/matrixService.js";

// Interface layer
import { MatrixController } from "./interface/matrix/matrixController.js";
import { matrixRouter } from "./interface/matrix/matrixRoutes.js";
import { swaggerSpec } from "./interface/swagger/swaggerConfig.js";

/**
 * Configure the Express application with middleware and basic routes
 */
function configureApp(app: Express): void {
  // Middleware
  app.use(express.json());

  // Health check route
  app.get("/", (req, res) => {
    res.send({
      status: "ok",
      message: "Interseguro Matrix Operations API is running.",
      documentation: "/api/docs",
    });
  });
}

/**
 * Set up API routes and documentation
 */
function setupRoutes(app: Express): void {
  // Dependency injection
  const matrixService = new MatrixService();
  const matrixOperationsUseCase = new MatrixOperationsUseCase(matrixService);
  const matrixController = new MatrixController(matrixOperationsUseCase);

  // API routes
  app.use("/api/matrix", matrixRouter(matrixController));

  // API documentation
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    const app = express();
    const PORT = process.env.PORT || 3001;

    // Configure application
    configureApp(app);
    setupRoutes(app);

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `API documentation available at http://localhost:${PORT}/api/docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
