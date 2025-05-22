// External dependencies
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";
dotenv.config();

// Application layer
import { LoginUseCase } from "./application/auth/loginUseCase.js";

// Infrastructure layer
import { JWTService } from "./infrastructure/auth/jwtService.js";

// Interface layer
import { swaggerSpec } from "./interface/swagger/swaggerConfig.js";
import { InMemoryUserRepository } from "./infrastructure/auth/inMemoryUserRepository.js";
import { AuthController } from "./interface/auth/authController.js";
import { authRoutes } from "./interface/auth/authRoutes.js";

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
      message: "Interseguro Auth API is running.",
      documentation: "/api/docs",
    });
  });
}

/**
 * Set up API routes and documentation
 */
function setupRoutes(app: Express): void {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error("Missing environment variables: SECRET_KEY");
  }

  // Dependency injection
  const authService = new JWTService(SECRET_KEY);
  const userRepository = new InMemoryUserRepository();
  const loginUseCase = new LoginUseCase(userRepository, authService);
  const authController = new AuthController(loginUseCase);

  // API routes
  app.use("/api/auth", authRoutes(authController));

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
