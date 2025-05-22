import { LoginUseCase } from "../../application/auth/loginUseCase.js";
import { Request, Response } from "express";

export class AuthController {
  /**
   * Creates a new auth controller
   * @param loginUseCase The use case for logging in a user
   */
  constructor(private loginUseCase: LoginUseCase) {}

  /**
   * Handles user login
   * @param req The HTTP request
   * @param res The HTTP response
   */
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const token = await this.loginUseCase.execute(email, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  };
}
