import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    await AuthService.register({ first_name, last_name, email, password });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
