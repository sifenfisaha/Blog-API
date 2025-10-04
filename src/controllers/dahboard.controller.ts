import { Request, Response } from "express";
import { GetUserDashboardStats } from "../services/dashboard.service";

export const dahboardStat = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const { totalBlogs, publishedBlogs, totalLikes, totalViews } =
      await GetUserDashboardStats.getStat(userId);
    return res.json({
      success: true,
      totalBlogs,
      publishedBlogs,
      totalLikes,
      totalViews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to stat",
      error: error instanceof Error ? error.message : error,
    });
  }
};
