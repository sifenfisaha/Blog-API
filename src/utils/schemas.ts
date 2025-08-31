import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const createBlogSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  body: z.string().min(10, { message: "Body must be at least 10 characters" }),
  tags: z.array(z.string().min(1, { message: "tags must be at least 1" })),
});

export const updateBlogSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  body: z.string().min(10).optional(),
  tags: z.array(z.string()).optional(),
});

export const blogIdParamSchema = z.object({
  id: z.string().length(24, { message: "Invalid blog ID" }),
});

export const blogQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
  state: z.enum(["draft", "published"]).optional(),
  search: z.string().optional(),
  sortBy: z.enum(["read_count", "reading_time", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
