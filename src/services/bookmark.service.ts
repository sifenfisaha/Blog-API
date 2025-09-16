import mongoose from "mongoose";
import Blog from "../models/blog.model";
import User from "../models/user.model";

export class BookmarkService {
  static async toggleBookmark(userId: string, blogId: string) {
    const blog = await Blog.findById(blogId);
    const bId = new mongoose.Types.ObjectId(blogId);
    if (!blog) throw new Error("Blog not found");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isBookmarked = user.bookmarks.some((id) => id.toString() === blogId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== blogId);
    } else {
      user.bookmarks.push(bId);
    }

    await user.save();

    const populatedUser = await User.findById(userId).populate("bookmarks");

    return { bookmarks: populatedUser?.bookmarks, isBookmarked };
  }
  static async getBookmarks(userId: string) {
    const user = await User.findById(userId).populate("bookmarks");
    if (!user) throw new Error("User not found");

    return { boookmarks: user.bookmarks };
  }
}
