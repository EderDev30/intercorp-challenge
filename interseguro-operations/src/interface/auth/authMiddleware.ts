import { Request, Response, NextFunction } from "express";
import { AuthValidatorUseCase } from "src/application/auth/authValidatorUseCase.js";

export class AuthMiddleware {
  constructor(private readonly authValidatorUseCase: AuthValidatorUseCase) {}

  execute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const { userId } = await this.authValidatorUseCase.execute(token);
      req.userId = userId;
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: "Error validating token",
          details: error.message,
        });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  };
}
