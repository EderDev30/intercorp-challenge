// External dependencies
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

// Application layer
import { QRFactorizationUseCase } from "./application/qr/qrFactorizationUseCase.js";

// Infrastructure layer
import { MathJsQRService } from "./infrastructure/qr/mathjsQRService.js";

// Interface layer
import { QRController } from "./interface/qr/qrController.js";
import { qrRouter } from "./interface/qr/qrRoutes.js";
import { swaggerSpec } from "./interface/swagger/swaggerConfig.js";
import { HttpMatrixOperationsApiClient } from "./infrastructure/matrix/httpMatrixOperationsApiClient.js";

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
      message: "Interseguro QR Factorization API is running",
      documentation: "/api/docs",
    });
  });
}

/**
 * Set up API routes and documentation
 */
function setupRoutes(app: Express): void {
  const MATRIX_API_URL = process.env.MATRIX_API_URL || "http://localhost:3001";

  // Dependency injection
  const qrService = new MathJsQRService();
  const matrixService = new HttpMatrixOperationsApiClient(MATRIX_API_URL);
  const qrUseCase = new QRFactorizationUseCase(matrixService, qrService);
  const qrController = new QRController(qrUseCase);

  // API routes
  app.use("/api", qrRouter(qrController));

  // API documentation
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;

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
