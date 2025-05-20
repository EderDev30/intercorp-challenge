import {
  MatrixOperationsResult,
  QRFactorizationResult,
} from "../../domain/matrix/entities.js";
import { MatrixOperationsService } from "../../domain/matrix/interfaces.js";

/**
 * Use case for processing QR factorization results
 */
export class MatrixOperationsUseCase {
  /**
   * Creates a new matrix operations use case
   * @param matrixService Service for performing matrix operations
   */
  constructor(private readonly matrixService: MatrixOperationsService) {}

  /**
   * Processes QR factorization result directly provided
   * @param qrResult The QR factorization result
   * @returns The result of the matrix operations
   */
  async execute(
    qrResult: QRFactorizationResult
  ): Promise<MatrixOperationsResult> {
    try {
      return await this.matrixService.performMatrixOperations(qrResult);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to process matrix: ${error.message}`);
      }
      throw new Error("Failed to process matrix: unknown error");
    }
  }
}
