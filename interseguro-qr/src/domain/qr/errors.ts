/**
 * Custom error class for matrix validation errors
 */
export class MatrixValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MatrixValidationError";
  }
}
