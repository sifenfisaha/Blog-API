import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/token.service";
import jwt from "jsonwebtoken";

export const isAutenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = TokenService.verifyToken(token);

    (req as any).userId = decoded?.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
