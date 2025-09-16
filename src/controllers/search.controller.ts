import { Request, Response } from "express";
import { SearchService } from "../services/search.service";

export const searchBlogs = async (req: Request, res: Response) => {
  const data = req.query;

  try {
    const { blogs, total } = await SearchService.searchBlog(data);
    return res.status(200).json({
      total,
      page: Number(data?.page || 1),
      totalPages: Math.ceil(total / Number(data?.limit || 10)),
      results: blogs.length,
      blogs,
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
