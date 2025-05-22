import { AuthService, UserRepository } from "../../domain/auth/interfaces.js";

/**
 * Use case for logging in a user
 */
export class LoginUseCase {
  /**
   * Creates a new login use case
   * @param userRepository The repository that handles user data
   * @param authService The service that handles authentication
   */
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  /**
   * Executes the login use case
   * @param email The email of the user
   * @param password The password of the user
   * @returns A token if the login is successful
   * @throws Error if the user is not found or if the password is invalid
   */
  async execute(email: string, password: string): Promise<string> {
    // Find the user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const isPasswordValid = await this.authService.verifyPassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    // Generate a token for the user
    const token = await this.authService.generateToken(userWithoutPassword);
    return token;
  }
}
