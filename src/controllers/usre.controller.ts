import { Request, Response } from "express";
import { UserService } from "../services/user.service";
export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const user = await UserService.getProfile(userId);
    res.status(200).json({
      success: true,
      message: "succssfully retrived user info",
      user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const data = req.body;

  try {
    const user = await UserService.updateProfile(data, userId);
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export const deletUser = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const user = await UserService.deleteUser(userId);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully", user });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};
