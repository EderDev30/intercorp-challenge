import { Router } from "express";
import { AuthController } from "./authController.js";

export function authRoutes(authController: AuthController): Router {
  const router = Router();
  /**
   * @swagger
   * /api/auth/token/validate:
   *   post:
   *     summary: Validate a JWT token
   *     description: Validate a JWT token and return user id
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Token Validation
   *     responses:
   *       200:
   *         description: User id is returned
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                  type: string
   *                  description: User id
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
   *       401:
   *         description: Unauthorized
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
  router.post("/token/validate", authController.validateToken);
  return router;
}
