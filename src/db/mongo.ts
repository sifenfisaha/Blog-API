import mongoose from "mongoose";
import { env } from "../config/env";

const conndectDb = async (cb: () => void): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Successfully connected to MongoDB");
    if (cb) cb();
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default conndectDb;
