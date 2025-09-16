import mongoose from "mongoose";
import { Iuser } from "../types/types";

const UserSchema = new mongoose.Schema<Iuser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookmarks: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  },
  { timestamps: true }
);

const User = mongoose.model<Iuser>("User", UserSchema);

export default User;
