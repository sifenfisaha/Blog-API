import { Request, Response } from "express";
import { BookmarkService } from "../services/bookmark.service";

export const toggleBookmark = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const blogId = req.params.blogId;
  try {
    const { bookmarks, isBookmarked } = await BookmarkService.toggleBookmark(
      userId,
      blogId
    );
    return res.status(200).json({
      success: true,
      message: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      bookmarks,
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const { boookmarks } = await BookmarkService.getBookmarks(userId);
    return res.status(200).json({
      success: true,
      boookmarks,
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
