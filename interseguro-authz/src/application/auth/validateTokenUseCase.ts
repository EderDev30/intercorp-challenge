import { ValidateTokenService } from "src/domain/auth/interfaces.js";

export class ValidateTokenUseCase {
  constructor(private readonly validateToken: ValidateTokenService) {}

  async execute(token: string): Promise<string> {
    const decodedToken = await this.validateToken.validate(token);
    if (!decodedToken) {
      throw new Error("Authentication failed");
    }
    return decodedToken.id;
  }
}
