import { Matrix } from "../../domain/matrix/entities.js";

/**
 * Result of a QR factorization
 */
export interface QRFactorizationResult {
  /**
   * The orthogonal matrix Q
   */
  q: Matrix;

  /**
   * The upper triangular matrix R
   */
  r: Matrix;
}
