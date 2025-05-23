import { ExternalUser } from "../../domain/auth/entities.js";
import { AuthValidator } from "../../domain/auth/interfaces.js";

export class AuthValidatorUseCase {
  constructor(private readonly authValidator: AuthValidator) {}

  async execute(token: string): Promise<ExternalUser> {
    if (!token) {
      throw new Error("Token not provided");
    }
    return await this.authValidator.validate(token);
  }
}
