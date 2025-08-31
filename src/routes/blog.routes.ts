import { Router } from "express";
import { createBlog } from "../controllers/blog.controller";
import { isAutenticated } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createBlogSchema } from "../utils/schemas";

const router = Router();

router.post(
  "/",
  validate({ body: createBlogSchema }),
  isAutenticated,
  createBlog
);

export default router;
