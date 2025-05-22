import { User } from "../../domain/auth/entities.js";
import { UserRepository } from "../../domain/auth/interfaces.js";
import bcrypt from "bcrypt";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    // Initialize with some dummy users
    this.users.push({
      id: "1",
      email: "test@test.com",
      password: bcrypt.hashSync("123456", 10),
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user ? user : null;
  }
}
