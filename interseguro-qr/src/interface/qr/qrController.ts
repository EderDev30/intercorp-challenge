import { Request, Response } from "express";
import { QRFactorizationUseCase } from "../../application/qr/qrFactorizationUseCase.js";
import { MatrixValidationError } from "../../domain/qr/errors.js";

/**
 * Controller for QR factorization endpoints
 */
export class QRController {
  /**
   * Creates a new QR controller
   * @param qrUseCase The use case to perform QR factorization
   */
  constructor(private readonly qrUseCase: QRFactorizationUseCase) {}

  /**
   * Handles the request to perform QR factorization
   * @param req The HTTP request
   * @param res The HTTP response
   */
  factorize = async (req: Request, res: Response): Promise<void> => {
    try {
      const { matrix } = req.body;

      const result = await this.qrUseCase.execute(matrix);

      res.json(result);
    } catch (error) {
      if (error instanceof MatrixValidationError) {
        // Handle validation errors with 400 Bad Request
        res.status(400).json({ error: error.message });
      } else if (error instanceof Error) {
        // Handle other known errors with 500 Internal Server Error
        res.status(500).json({
          error: "Internal server error during matrix QR factorization",
          details: error.message,
        });
      } else {
        // Handle unknown errors
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  };
}
