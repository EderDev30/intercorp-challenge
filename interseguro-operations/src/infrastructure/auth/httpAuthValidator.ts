import axios from "axios";
import { ExternalUser } from "src/domain/auth/entities.js";
import { AuthValidator } from "src/domain/auth/interfaces.js";

export class HttpAuthValidator implements AuthValidator {
  constructor(private readonly baseUrl: string) {}

  async validate(token: string): Promise<ExternalUser> {
    try {
      const response = await axios.post<ExternalUser>(
        `${this.baseUrl}/api/auth/token/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Authentication API error (${error.response.status}): ${
              error.response.data.error || "Unknown error"
            }`
          );
        } else if (error.request) {
          throw new Error("No response received from Authentication API");
        } else {
          throw new Error(`Error setting up request: ${error.message}`);
        }
      }
      throw new Error("Failed to authentication");
    }
  }
}
