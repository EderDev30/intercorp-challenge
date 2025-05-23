import { MatrixOperationsResult } from "../../domain/matrix/entities.js";
import { MatrixOperationsApiClient } from "../../domain/matrix/interfaces.js";
import { QRFactorizationResult } from "../../domain/qr/entities.js";
import axios from "axios";

export class HttpMatrixOperationsApiClient
  implements MatrixOperationsApiClient
{
  /**
   * Creates a new HTTP client for the Matrix Operations API
   * @param baseUrl The base URL of the Matrix Operations API
   */
  constructor(private readonly baseUrl: string) {}

  /**
   * Fetches Matrix Operations result from the external API
   * @param qrResult The QR factorization result
   * @param token JWT token for authorization
   * @returns The result of matrix operations
   */
  async fetchMatrixOperations(
    qrResult: QRFactorizationResult,
    token: string
  ): Promise<MatrixOperationsResult> {
    try {
      const response = await axios.post<MatrixOperationsResult>(
        `${this.baseUrl}/api/matrix/operations`,
        { ...qrResult },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Matrix Operations API error (${error.response.status}): ${
              error.response.data.error || "Unknown error"
            }`
          );
        } else if (error.request) {
          throw new Error("No response received from Matrix Operations API");
        } else {
          throw new Error(`Error setting up request: ${error.message}`);
        }
      }
      throw new Error("Failed to fetch Matrix Operations");
    }
  }
}
