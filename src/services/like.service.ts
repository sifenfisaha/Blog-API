import mongoose from "mongoose";
import Blog from "../models/blog.model";

export class LikeService {
  static async toggleLike(userId: string, blogId: string) {
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    const Uid = new mongoose.Types.ObjectId(userId);

    const hasLiked = blog.likedBy.some((id) => id.toString() === userId);

    if (hasLiked) {
      blog.likedBy = blog.likedBy.filter((id) => id.toString() !== userId);
      blog.likes -= 1;
    } else {
      blog.likedBy.push(Uid);
      blog.likes += 1;
    }
    await blog.save();
    return { likes: blog.likes, hasLiked };
  }
}
