import Blog from "../models/blog.model";
import Comment from "../models/comment.model";
import mongoose from "mongoose";

interface CreateComment {
  content: string;
  blogId: string;
  userId: string;
}

interface DeleteComment {
  commentId: string;
  userId: string;
}

export class CommentService {
  static async createComment({ content, blogId, userId }: CreateComment) {
    const blog = await Blog.findById(blogId);

    if (!blog) throw new Error("Blog not found");

    const comment = new Comment({ content, blog: blogId, author: userId });
    await comment.save();

    return comment;
  }

  static async getComment(blogId: string) {
    const blog = await Blog.findById(blogId);

    if (!blog) throw new Error("Blog not found");

    const comment = await Comment.find({ blog: blogId })
      .populate("author", "first_name last_name email")
      .sort({ createdAt: 1 });
    return comment;
  }
  static async deleteComment({ userId, commentId }: DeleteComment) {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    const blog = await Blog.findById(comment.blog);
    if (!blog) throw new Error("Blog not found");

    const commentAuthor =
      comment.author instanceof mongoose.Types.ObjectId
        ? comment.author.toString()
        : comment.author;

    const blogAuthor =
      blog.author instanceof mongoose.Types.ObjectId
        ? blog.author.toString()
        : blog.author;

    if (commentAuthor === userId || blogAuthor !== userId) {
      await Comment.findByIdAndDelete(commentId);
    } else {
      throw new Error("Not authorized");
    }
  }
}
