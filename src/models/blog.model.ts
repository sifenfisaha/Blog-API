import mongoose, { mongo } from "mongoose";
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
