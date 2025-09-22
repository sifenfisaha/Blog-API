import z from "zod";
import { createBlogSchema, publicBlogQuerySchema } from "../utils/schemas";
import Blog from "../models/blog.model";
import { calculateReadingTime } from "../utils/readingTime";
import { Types } from "mongoose";
import { UpdateBlog } from "../controllers/blog.controller";

type CreateInput = z.infer<typeof createBlogSchema> & {
  userId: Types.ObjectId;
};

export type Query = z.infer<typeof publicBlogQuerySchema>;

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
    const query: any = { author: userId };
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
  static async listPublishedBlogs(query: any) {
    const { search, author, sortBy = "createdAt" } = query;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    let tags = query.tags;

    if (typeof tags === "string") {
      tags = tags.split(",");
    }

    const filter: any = { state: "published" };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    if (author) {
      filter.author = author;
    }

    let sortCriteria: any = { createdAt: -1 };
    if (sortBy === "oldest") sortCriteria = { createdAt: 1 };
    if (sortBy === "popular") sortCriteria = { read_count: -1 };
    if (sortBy === "likes") sortCriteria = { likes: -1 };

    const blogs = await Blog.find(filter)
      .populate("author", "first_name last_name email")
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Blog.countDocuments(filter);
    const totalPage = Math.ceil(total / limit);
    const hasMore = page < totalPage;
    const nextPage = hasMore ? page + 1 : null;
    return { blogs, total, page, limit, totalPage, hasMore, nextPage };
  }
  static async getPublishedBlog(blogId: string) {
    const blog = await Blog.findOne({
      _id: blogId,
      state: "published",
    }).populate("author", "first_name last_name email");

    if (!blog) throw new Error("Blog not found");

    blog.read_count = (blog.read_count || 0) + 1;
    await blog.save();

    return blog;
  }
}
