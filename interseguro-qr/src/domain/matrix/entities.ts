import { QRFactorizationResult } from "../../domain/qr/entities.js";

/**
 * Represents a matrix as a two-dimensional array of numbers
 */
export type Matrix = number[][];

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

/**
 * Result of the matrix operation and QR factorization
 */
export interface MatrixResult extends QRFactorizationResult {
  operations: MatrixOperationsResult;
}
