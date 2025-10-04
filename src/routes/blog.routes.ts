import { Router } from "express";
import {
  createBlog,
  deletBlog,
  getMyBlog,
  getPublishedBlog,
  listPublishedBlogs,
  publishBlog,
  updateBlog,
} from "../controllers/blog.controller";
import { isAutenticated } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  blogIdParamSchema,
  blogQuerySchema,
  createBlogSchema,
  publicBlogQuerySchema,
  updateBlogSchema,
} from "../utils/schemas";

const router = Router();

router.get(
  "/me",
  validate({ query: blogQuerySchema }),
  isAutenticated,
  getMyBlog
);

router.get("/", validate({ query: publicBlogQuerySchema }), listPublishedBlogs);

router.get("/:id", getPublishedBlog);

router.post(
  "/",
  validate({ body: createBlogSchema }),
  isAutenticated,
  createBlog
);

router.put(
  "/:id",
  validate({ body: createBlogSchema }),
  isAutenticated,
  updateBlog
);
router.patch(
  "/:id/publish",
  validate({ params: blogIdParamSchema }),
  isAutenticated,
  publishBlog
);
router.delete(
  "/:id",
  validate({ params: blogIdParamSchema }),
  isAutenticated,
  deletBlog
);

export default router;
