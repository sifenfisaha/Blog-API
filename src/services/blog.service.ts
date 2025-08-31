import z from "zod";
import { createBlogSchema } from "../utils/schemas";
import Blog from "../models/blog.model";
import { calculateReadingTime } from "../utils/readingTime";
import { Types } from "mongoose";
import { UpdateBlog } from "../controllers/blog.controller";

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
  static async getMyBlogs(
    userId: string,
    state?: string,
    page = 1,
    limit = 20
  ) {
    const query: any = { autorId: userId };
    if (state) query.state = state;

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    return { blogs, total, page, limit };
  }
  static async updateBlog(data: UpdateBlog, userId: string, blogId: string) {
    const blog = await Blog.findOne({ _id: blogId, author: userId });
    if (!blog) throw new Error("Blog not found");

    Object.assign(blog, data);
    if (data.body) {
      const minutes = calculateReadingTime(data.body);
      blog.reading_time = minutes;
    }

    await blog.save();

    return blog;
  }
  static async publishBlog(userId: string, blogId: string) {
    const blog = await Blog.findOne({ _id: blogId, author: userId });
    if (!blog) throw new Error("Blog not found");
    blog.state = "published";
    await blog.save();
    return blog;
  }
  static async deleteBlog(userId: string, blogId: string) {
    const blog = await Blog.findOneAndDelete({ _id: blogId, author: userId });
    if (!blog) throw new Error("Blog not found");

    return blog;
  }
}
