import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface tokenPayload {
  userId: string;
}

export class TokenService {
  static generateToken({ userId }: tokenPayload) {
    return jwt.sign({ userId }, env.JWT_SECRET!, {
      expiresIn: env.JWT_EXPIRES_IN!,
    });
  }
  static verifyToken<T extends object = tokenPayload>(token: string): T | null {
    const decoded = jwt.verify(token, env.JWT_SECRET!);
    return decoded as T;
  }
}
