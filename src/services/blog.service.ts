import z from "zod";
import { createBlogSchema } from "../utils/schemas";
import Blog from "../models/blog.model";
import { calculateReadingTime } from "../utils/readingTime";
import { Types } from "mongoose";

type CreateInput = z.infer<typeof createBlogSchema> & {
  userId: Types.ObjectId;
};

export class BlogService {
  static async createBlog({
    body,
    title,
    description,
    tags,
    userId,
  }: CreateInput) {
    // state, read_count, and reading_time are set by backend
    const authorId = new Types.ObjectId(userId);

    const minutes = calculateReadingTime(body);

    const blog = new Blog({
      body,
      title,
      description,
      tags,
      state: "draft",
      reading_time: minutes,
      author: authorId,
    });
    await blog.save();

    return { blog };
  }
}
