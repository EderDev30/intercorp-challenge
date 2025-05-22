import { Router } from "express";
import { AuthController } from "./authController.js";

export function authRoutes(authController: AuthController): Router {
  const router = Router();
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: User login
   *     description: Authenticate a user and return a JWT token
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *           properties:
   *             email:
   *              type: string
   *              format: email
   *             password:
   *              type: string
   *           example:
   *             email: "test@test.com"
   *             password: "123456"
   *     responses:
   *       200:
   *         description: Successfull login
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                  type: string
   *                  description: JWT token for the authenticated user
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                  type: string
   *                  description: Error message
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                  type: string
   *                  description: Error message
   */
  router.post("/login", authController.login);
  return router;
}
