import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";

export const createComment = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { blogId } = req.params;
  const userId = (req as any).userId;
  try {
    const comment = await CommentService.createComment({
      content,
      blogId,
      userId,
    });
    return res.status(201).json({
      success: true,
      data: comment,
      message: "comment created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const GetComment = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    const comment = await CommentService.getComment(blogId);
    return res.json({ success: true, data: comment });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deletComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = (req as any).userId;
  try {
    await CommentService.deleteComment({ commentId, userId });
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: error instanceof Error ? error.message : error,
    });
  }
};
