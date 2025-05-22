import { ExternalUser } from "./entities.js";

export interface ValidateTokenService {
  validate: (token: string) => Promise<ExternalUser>;
}
