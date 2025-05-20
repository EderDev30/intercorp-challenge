import { Request, Response } from "express";
import { MatrixOperationsUseCase } from "../../application/matrix/matrixOperationsUseCase.js";
import { QRFactorizationResult } from "../../domain/matrix/entities.js";

/**
 * Controller for matrix operations endpoints
 */
export class MatrixController {
  /**
   * Creates a new matrix controller
   * @param matrixOperationsUseCase The use case for matrix operations
   */
  constructor(
    private readonly matrixOperationsUseCase: MatrixOperationsUseCase
  ) {}

  /**
   * Process QR factorization result provided in the request
   * @param req The HTTP request
   * @param res The HTTP response
   */
  performMatrixOperations = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const qrResult: QRFactorizationResult = req.body;

      if (!qrResult || !qrResult.q || !qrResult.r) {
        res.status(400).json({
          error:
            "Invalid input: QR factorization result must contain q and r matrices",
        });
        return;
      }

      const result = await this.matrixOperationsUseCase.execute(qrResult);

      res.json(result);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).json({
          error: "Error processing QR factorization result",
          details: error.message,
        });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  };
}
