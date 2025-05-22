export interface User {
  id: string;
  email: string;
  password: string;
}

export type ExternalUser = Omit<User, "password">;
