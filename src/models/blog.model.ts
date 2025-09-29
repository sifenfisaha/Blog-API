import mongoose, { mongo, Schema } from "mongoose";
import { IBlog } from "../types/types";

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

blogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blog",
});

blogSchema.set("toObject", { virtuals: true });
blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
