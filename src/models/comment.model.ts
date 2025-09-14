import { Icomment } from "../types/types";
import mongoose, { mongo, Schema } from "mongoose";

const commentSchema = new Schema<Icomment>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model<Icomment>("Comment", commentSchema);

export default Comment;
