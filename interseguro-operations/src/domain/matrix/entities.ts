/**
 * Domain entities for matrix operations
 */

/**
 * Represents a matrix as a two-dimensional array of numbers
 */
export type Matrix = number[][];

/**
 * Input from the QR factorization API
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

/**
 * Result of the matrix operations
 */
export interface MatrixOperationsResult {
  /**
   * Maximum value in the matrix
   */
  maxValue: number;

  /**
   * Minimum value in the matrix
   */
  minValue: number;

  /**
   * Average value of the matrix
   */
  averageValue: number;

  /**
   * Sum of all elements in the matrix
   */
  totalSum: number;
  /**
   * Indicates whether one of the matrices is a diagonal matrix
   */
  hasDiagonalMatrix: boolean;
}
