import { Matrix } from "../../domain/matrix/entities.js";
import { QRFactorizationResult } from "./entities.js";

/**
 * Interface for the QR factorization service
 */
export interface QRFactorizationService {
  /**
   * Performs QR factorization on a matrix
   * @param matrix The input matrix
   * @returns The QR factorization result containing Q and R matrices
   */
  factorize(matrix: Matrix): Promise<QRFactorizationResult>;
}
