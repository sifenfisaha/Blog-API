import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};
