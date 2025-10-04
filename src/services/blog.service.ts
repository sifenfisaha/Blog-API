import z from "zod";
import { createBlogSchema, publicBlogQuerySchema } from "../utils/schemas";
import Blog from "../models/blog.model";
import { calculateReadingTime } from "../utils/readingTime";
import { Types } from "mongoose";
import { UpdateBlog } from "../controllers/blog.controller";
import Comment from "../models/comment.model";

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
    state,
  }: CreateInput) {
    // state, read_count, and reading_time are set by backend
    const authorId = new Types.ObjectId(userId);
    const minutes = calculateReadingTime(body);

    const blog = new Blog({
      body,
      title,
      description,
      tags,
      reading_time: minutes,
      author: authorId,
      state: state,
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
    console.log(blog);
    console.log("hi");
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
      tags = tags.split(",").filter((tag) => tag.trim() !== "");
    }

    const filter: any = { state: "published" };

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    if (author) {
      filter.author = author;
    }

    const sortOptions: Record<string, any> = {
      all: { createdAt: -1 },
      latest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      popular: { likes: -1 },
      "most-read": { read_count: -1 },
      trending: { likes: -1, read_count: -1 },
    };
    const sortCriteria = sortOptions[sortBy] || sortOptions["all"];

    const blogs = await Blog.find(filter)
      .populate("author", "first_name last_name email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "first_name last_name email" }, // attach user info
      })
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
    })
      .populate("author", "first_name last_name email")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "author", select: "first_name last_name email" }, // attach user info
      });

    if (!blog) throw new Error("Blog not found");

    blog.read_count = (blog.read_count || 0) + 1;
    await blog.save();

    return { blog };
  }
}
