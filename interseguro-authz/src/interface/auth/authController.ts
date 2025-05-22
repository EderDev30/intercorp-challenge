import { Request, Response } from "express";
import { ValidateTokenUseCase } from "src/application/auth/validateTokenUseCase.js";

export class AuthController {
  constructor(private readonly validateTokenUseCase: ValidateTokenUseCase) {}

  validateToken = async (req: Request, res: Response) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const userId = await this.validateTokenUseCase.execute(token);
      return res.json({ userId });
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
