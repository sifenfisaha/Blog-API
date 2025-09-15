import mongoose, { Document, ObjectId } from "mongoose";
export interface Iuser extends Document {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlog extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  body: string;
  tags: string[];
  author: ObjectId;
  state: "draft" | "published";
  read_count: number;
  reading_time: number;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  timestamp: Date;
  updatedAt: Date;
}

export interface Icomment extends Document {
  content: string;
  author: ObjectId;
  blog: ObjectId;
}
