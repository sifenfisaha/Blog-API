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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const data = await AuthService.login({ email, password });
    res.json({
      success: true,
      data,
      message: "successfully logged in",
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
