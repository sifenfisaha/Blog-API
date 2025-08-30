import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface tokenPayload {
  userId: string;
}

export class TokenService {
  static genrateToken({ userId }: tokenPayload) {
    return jwt.sign({ userId }, env.JWT_SECRET!, {
      expiresIn: env.JWT_EXPIRES_IN!,
    });
  }
  static verifyToken<T extends object = tokenPayload>(token: string): T | null {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET!);
      return decoded as T;
    } catch (error) {
      console.error("Invalid or expired token:", error);
      return null;
    }
  }
}
