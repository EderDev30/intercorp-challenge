import { Router } from "express";
import { MatrixController } from "./matrixController.js";
import { AuthMiddleware } from "../auth/authMiddleware.js";

/**
 * Creates and configures the router for matrix operations endpoints
 * @param authMiddleware The authentication middleware
 * @param matrixController The controller for matrix operations
 * @returns The configured router
 */
export function matrixRouter(
  authMiddleware: AuthMiddleware,
  matrixController: MatrixController
): Router {
  const router = Router();

  /**
   * @swagger
   * /api/matrix/operations:
   *   post:
   *     summary: Perform operations on QR factorization result
   *     description: Calculate statistical operations on the QR factorization matrices
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Matrix Operations
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - q
   *               - r
   *             properties:
   *               q:
   *                 type: array
   *                 description: The orthogonal matrix Q
   *                 items:
   *                   type: array
   *                   items:
   *                     type: number
   *               r:
   *                 type: array
   *                 description: The upper triangular matrix R
   *                 items:
   *                   type: array
   *                   items:
   *                     type: number
   *             example:
   *               q: [[0.5773, 0.5773], [0.5773, -0.5773], [0.5773, 0.5773]]
   *               r: [[1.7321, 1.7321], [0, 1.7321]]
   *     responses:
   *       200:
   *         description: Result of matrix operations
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 maxValue:
   *                   type: number
   *                   description: Maximum value in the Q and R matrices.
   *                 minValue:
   *                   type: number
   *                   description: Minimum value in the Q and R matrices.
   *                 averageValue:
   *                   type: number
   *                   description: Average value of the matrix elements.
   *                 totalSum:
   *                   type: number
   *                   description: Sum of all elements in the Q and R matrices.
   *                 hasDiagonalMatrix:
   *                   type: boolean
   *                   description: Whether one of the matrices is a diagonal matrix.
   *             example:
   *               maxValue: 1.7321
   *               minValue: -0.5773
   *               averageValue: 0.7505499999999999
   *               totalSum: 7.5055
   *               hasDiagonalMatrix: false
   *       400:
   *         description: Invalid input
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                 details:
   *                   type: string
   */
  router.post(
    "/operations",
    authMiddleware.execute,
    matrixController.performMatrixOperations
  );

  return router;
}
