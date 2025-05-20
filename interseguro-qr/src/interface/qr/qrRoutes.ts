import { Router } from "express";
import { QRController } from "./qrController.js";

/**
 * Creates and configures the router for QR factorization endpoints
 * @param qrController The controller for QR factorization and matrix operations
 * @returns The configured router
 */
export function qrRouter(qrController: QRController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/matrix/qr:
   *   post:
   *     summary: Perform QR factorization and additional matrix operations
   *     description: Decomposes a matrix into its Q (orthogonal) and R (upper triangular) components and performs additional matrix operations
   *     tags:
   *       - Matrix Operations
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - matrix
   *             properties:
   *               matrix:
   *                 type: array
   *                 description: A rectangular matrix represented as an array of arrays
   *                 items:
   *                   type: array
   *                   items:
   *                     type: number
   *             example:
   *               matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
   *     responses:
   *       200:
   *         description: QR factorization and matrix operations result
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 q:
   *                   type: array
   *                   description: The orthogonal matrix Q
   *                   items:
   *                     type: array
   *                     items:
   *                       type: number
   *                 r:
   *                   type: array
   *                   description: The upper triangular matrix R
   *                   items:
   *                     type: array
   *                     items:
   *                       type: number
   *                 operations:
   *                   type: object
   *                   description: Results of additional matrix operations
   *                   properties:
   *                     maxValue:
   *                       type: number
   *                       description: Maximum value in the Q and R matrices.
   *                     minValue:
   *                       type: number
   *                       description: Minimum value in the Q and R matrices.
   *                     averageValue:
   *                       type: number
   *                       description: Average value of the matrix elements.
   *                     totalSum:
   *                       type: number
   *                       description: Sum of all elements in the Q and R matrices.
   *                     hasDiagonalMatrix:
   *                       type: boolean
   *                       description: Whether one of the matrices is a diagonal matrix.
   *             example:
   *               q: [[0.12309149097933281, 0.9045340337332906, 0.4082482904638637], [0.49236596391733095, 0.3015113445777642, -0.8164965809277258],[0.8616404368553291,-0.30151134457776396, 0.4082482904638628]]
   *               r: [[8.12403840463596, 9.601136296387953, 11.078234188139946],[0, 0.9045340337332907, 1.8090680674665816], [0, 0, 1.9984014443252818e-15]]
   *               operations:
   *                maxValue: 11.078234188139946
   *                minValue: -0.8164965809277258
   *                averageValue: 1.8832579397693898
   *                totalSum: 33.89864291584902
   *                hasDiagonalMatrix: false
   *       400:
   *         description: Invalid input
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
  router.post("/matrix/qr", qrController.factorize);

  return router;
}
