import { Request, Response } from "express";
import { BlogService } from "../services/blog.service";

export const createBlog = async (req: Request, res: Response) => {
  const { body, title, description, tags } = req.body;
  const userId = (req as any).userId;
  try {
    const blog = await BlogService.createBlog({
      body,
      title,
      description,
      tags,
      userId,
    });
    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error instanceof Error ? error.message : error,
    });
  }
};
