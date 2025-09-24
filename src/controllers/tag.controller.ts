import type { Request, Response } from "express";
import Blog from "../models/blog.model";

export const popularTags = async (req: Request, res: Response) => {
  try {
    const tags = await Blog.aggregate([
      { $unwind: "$tags" }, // flatten tags array
      {
        $group: {
          _id: "$tags", // group by tag
          count: { $sum: 1 }, // count how many times each tag appears
        },
      },
      { $sort: { count: -1 } }, // sort by popularity
      { $limit: 10 }, // top 10 tags
      {
        $project: {
          _id: 0,
          tag: "$_id",
          count: 1,
        },
      },
    ]);

    res.json({ success: true, tags });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Failed to fetch popular tags", error: err });
  }
};
