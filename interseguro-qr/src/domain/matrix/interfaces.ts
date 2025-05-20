import { QRFactorizationResult } from "../../domain/qr/entities.js";
import { MatrixOperationsResult } from "./entities.js";

/**
 * Interface for Matrix Operations API client
 */
export interface MatrixOperationsApiClient {
  /**
   * Fetches Matrix Operations result from the external API
   * @param qrResult The QR factorization result
   * @returns The result of matrix operations
   */
  fetchMatrixOperations(
    qrResult: QRFactorizationResult
  ): Promise<MatrixOperationsResult>;
}
