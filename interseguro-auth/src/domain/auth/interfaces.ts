import { ExternalUser, User } from "./entities.js";

/**
 * Interface for user repository
 */
export interface UserRepository {
  /**
   * Finds a user by their email
   * @param email The email of the user to find
   * @returns The user if found, null otherwise
   */
  findByEmail(email: string): Promise<User | null>;
}

/**
 * Interface for authentication service
 */
export interface AuthService {
  /**
   * Generates a token for the user
   * @param user The user for whom the token is generated
   * @returns The generated token
   */
  generateToken(user: ExternalUser): Promise<string>;

  /**
   * Verifies the password
   * @param password The password to verify
   * @param hashedPassword The hashed password to compare against
   * @returns True if the password is valid, false otherwise
   */
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}
