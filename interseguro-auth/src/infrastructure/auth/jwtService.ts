import { ExternalUser } from "../../domain/auth/entities.js";
import jwt from "jsonwebtoken";
import { AuthService } from "../../domain/auth/interfaces.js";
import bcrypt from "bcrypt";

export class JWTService implements AuthService {
  private secretKey: string;
  private expiresIn: number;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.expiresIn = 60 * 60 * 24 * 1;
  }

  async generateToken(user: ExternalUser): Promise<string> {
    return jwt.sign(user, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
