import { Matrix, MatrixResult } from "../../domain/matrix/entities.js";
import { MatrixOperationsApiClient } from "../../domain/matrix/interfaces.js";
import { QRFactorizationService } from "../../domain/qr/interfaces.js";
import { validateMatrixForQR } from "../../domain/qr/validations.js";

/**
 * Use case for performing QR factorization and fetches matrix operations
 */
export class QRFactorizationUseCase {
  /**
   * Creates a new QR factorization use case
   * @param matrixService The service that handles matrix operations
   * @param qrService The service that performs QR factorization
   */
  constructor(
    private readonly matrixService: MatrixOperationsApiClient,
    private readonly qrService: QRFactorizationService
  ) {}

  /**
   * Performs QR factorization on a matrix and fetches matrix operations
   * @param inputMatrix The matrix to QR factorize
   * @returns The QR factorization and matrix operations result
   * @throws Error if the input is not a valid matrix or if QR factorization fails or the external API call fails
   */
  async execute(inputMatrix: unknown): Promise<MatrixResult> {
    const validMatrix: Matrix = validateMatrixForQR(inputMatrix);

    const qrResult = await this.qrService.factorize(validMatrix);

    const result = await this.matrixService.fetchMatrixOperations(qrResult);

    return {
      ...qrResult,
      operations: result,
    };
  }
}
