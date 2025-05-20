import {
  MatrixOperationsResult,
  QRFactorizationResult,
} from "../../domain/matrix/entities.js";
import { MatrixOperationsService } from "../../domain/matrix/interfaces.js";

/**
 * Implementation of MatrixOperationsService
 */
export class MatrixService implements MatrixOperationsService {
  /**
   * Tolerance value for considering a number effectively zero in floating-point arithmetic.
   * Values smaller than this (in absolute terms) are treated as zero.
   * This helps handle floating-point precision issues in matrix calculations.
   */
  private static readonly ZERO_TOLERANCE = 1e-10;

  /**
   * Checks if a matrix is diagonal (all non-diagonal elements are close to zero)
   * @param matrix The matrix to check
   * @returns True if the matrix is diagonal
   */
  private isDiagonalMatrix(matrix: number[][]): boolean {
    return matrix.every((row, i) =>
      row.every(
        (val, j) => i === j || Math.abs(val) < MatrixService.ZERO_TOLERANCE
      )
    );
  }

  /**
   * Calculates statistical values from an array of numbers
   * @param values Array of numbers to analyze
   * @returns Object containing max, min, average and sum
   */
  private calculateStatistics(values: number[]): {
    maxValue: number;
    minValue: number;
    averageValue: number;
    totalSum: number;
  } {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const totalSum = values.reduce((sum, val) => sum + val, 0);
    const averageValue = totalSum / values.length;

    return {
      maxValue,
      minValue,
      averageValue,
      totalSum,
    };
  }

  /**
   * Performs operations on the result of QR factorization
   * @param qrResult The QR factorization result
   * @returns The result of matrix operations
   */
  async performMatrixOperations(
    qrResult: QRFactorizationResult
  ): Promise<MatrixOperationsResult> {
    try {
      const { q, r } = qrResult;

      // Flatten arrays for statistical calculations
      const allValues = [...q.flat(), ...r.flat()];

      // Calculate statistics and check for diagonal matrices
      const stats = this.calculateStatistics(allValues);
      const hasDiagonalMatrix =
        this.isDiagonalMatrix(q) || this.isDiagonalMatrix(r);

      return {
        ...stats,
        hasDiagonalMatrix,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error processing QR result: ${error.message}`);
      }
      throw new Error("Unknown error processing QR result");
    }
  }
}
