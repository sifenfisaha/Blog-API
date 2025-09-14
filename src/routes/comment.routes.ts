import { Router } from "express";
import { isAutenticated } from "../middlewares/auth.middleware";
import {
  createComment,
  deletComment,
  GetComment,
} from "../controllers/comment.controller";
import { validate } from "../middlewares/validate.middleware";
import { contentSchema } from "../utils/schemas";

const router = Router();

router.post(
  "/:blogId",
  validate({ body: contentSchema }),
  isAutenticated,
  createComment
);

router.get("/:blogId", GetComment);

router.delete("/:commentId", deletComment);

export default router;
