import Blog from "../models/blog.model";
import mongoose from "mongoose";

export class GetUserDashboardStats {
  static async getStat(userId: string) {
    const totalBlogs = await Blog.countDocuments({ author: userId });

    const publishedBlogs = await Blog.countDocuments({
      author: userId,
      state: "published",
    });

    const likesAggregate = await Blog.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalLikes: { $sum: "$likes" } } },
    ]);

    const viewsAggregate = await Blog.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalViews: { $sum: "$read_count" } } },
    ]);

    const blogs = await Blog.find({ author: userId })
      .select("title state createdAt likes read_count")
      .sort({ createdAt: -1 });

    return {
      totalBlogs,
      publishedBlogs,
      totalLikes: likesAggregate[0]?.totalLikes || 0,
      totalViews: viewsAggregate[0]?.totalViews || 0,
      //   blogs,
    };
  }
}
