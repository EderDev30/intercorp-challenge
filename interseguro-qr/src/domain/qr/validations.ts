import { Matrix } from "../../domain/matrix/entities.js";
import { MatrixValidationError } from "./errors.js";

/**
 * Validates whether the input is a valid matrix for QR decomposition.
 *
 * Requirements:
 * - Must be a non-empty 2D array (array of arrays)
 * - All rows must be of equal length (rectangular shape)
 * - All elements must be valid numbers
 * - The number of rows must be greater than or equal to the number of columns (m ≥ n)
 *
 * @param matrix - The input to validate
 * @returns The validated Matrix if valid
 * @throws Error if the matrix is invalid for QR decomposition
 */
export function validateMatrixForQR(matrix: unknown): Matrix {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new MatrixValidationError("Matrix must be a non-empty array");
  }

  const numRows = matrix.length;

  if (!Array.isArray(matrix[0]) || matrix[0].length === 0) {
    throw new MatrixValidationError(
      "Matrix must be a 2D array with non-empty rows"
    );
  }

  const numCols = matrix[0].length;

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== numCols) {
      throw new MatrixValidationError("All rows must have the same length");
    }
    for (const value of row) {
      if (typeof value !== "number" || isNaN(value)) {
        throw new MatrixValidationError(
          "All matrix elements must be valid numbers"
        );
      }
    }
  }
  if (numRows < numCols) {
    throw new MatrixValidationError(
      "Number of rows must be greater than or equal to number of columns for QR factorization"
    );
  }

  return matrix as Matrix;
}
