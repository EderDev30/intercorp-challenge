import { QRFactorizationResult, MatrixOperationsResult } from "./entities.js";

/**
 * Interface for the matrix operations service
 */
export interface MatrixOperationsService {
  /**
   * Performs operations on the result of QR factorization
   * @param qrResult The QR factorization result
   * @returns The result of matrix operations
   */
  performMatrixOperations(
    qrResult: QRFactorizationResult
  ): Promise<MatrixOperationsResult>;
}
