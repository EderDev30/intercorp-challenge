import * as math from "mathjs";
import { QRFactorizationResult } from "../../domain/qr/entities.js";
import { QRFactorizationService } from "../../domain/qr/interfaces.js";
import { Matrix } from "../../domain/matrix/entities.js";

/**
 * Implementation of QRFactorizationService using the mathjs library
 */
export class MathJsQRService implements QRFactorizationService {
  /**
   * Performs QR factorization on a matrix using mathjs
   * @param matrix The input matrix
   * @returns The QR factorization result
   */
  async factorize(matrix: Matrix): Promise<QRFactorizationResult> {
    try {
      // Convert to mathjs matrix and perform QR factorization
      const mathMatrix = math.matrix(matrix);
      const qr = math.qr(mathMatrix);

      // Convert matrices back to arrays for JSON response
      return {
        q: math.matrix(qr.Q).toArray() as Matrix,
        r: math.matrix(qr.R).toArray() as Matrix,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error during QR factorization: ${error.message}`);
      }
      throw new Error("Unknown error during QR factorization");
    }
  }
}
