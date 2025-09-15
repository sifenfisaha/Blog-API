import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

export const toggleLike = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const userID = (req as any).userId;
  try {
    const { likes, hasLiked } = await LikeService.toggleLike(userID, blogId);
    return res
      .status(200)
      .json({ message: hasLiked ? "Unliked" : "Liked", likes });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Like blog",
      error: error instanceof Error ? error.message : error,
    });
  }
};
