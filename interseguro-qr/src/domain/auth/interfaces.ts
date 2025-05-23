import { ExternalUser } from "./entities.js";

export interface AuthValidator {
  validate: (token: string) => Promise<ExternalUser>;
}
