import jwt from "jsonwebtoken";
import { ExternalUser } from "../../domain/auth/entities.js";
import { ValidateTokenService } from "../../domain/auth/interfaces.js";

export class JWTService implements ValidateTokenService {
  constructor(private readonly secretKey: string) {}

  async validate(token: string): Promise<ExternalUser> {
    try {
      const decoded = jwt.verify(token, this.secretKey) as ExternalUser;
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
