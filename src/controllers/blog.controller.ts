import { Request, Response } from "express";
import { BlogService } from "../services/blog.service";
import z from "zod";
import { updateBlogSchema } from "../utils/schemas";

export type UpdateBlog = z.infer<typeof updateBlogSchema>;

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

export const getMyBlog = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { state, page, limit } = req.params;

  try {
    const result = await BlogService.getMyBlogs(
      userId,
      state as string | undefined,
      parseInt(page as string) || 1,
      parseInt(limit as string) || 20
    );
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const blogId = req.params.id;

  const data: UpdateBlog = req.body;
  try {
    const blog = await BlogService.updateBlog(data, userId, blogId);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const publishBlog = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const blogId = req.params.id;

  try {
    const blog = await BlogService.publishBlog(userId, blogId);
    res.status(200).json({ message: "Blog published successfully", blog });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export const deletBlog = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const blogId = req.params.id;
  try {
    const blog = await BlogService.deleteBlog(userId, blogId);
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfylly", blog });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};
