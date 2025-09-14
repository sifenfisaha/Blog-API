import { Router } from "express";
import { isAutenticated } from "../middlewares/auth.middleware";
import {
  createComment,
  deletComment,
  GetComment,
} from "../controllers/comment.controller";

const router = Router();

router.post("/:blogId", isAutenticated, createComment);

router.get("/:blogId", GetComment);

router.delete("/:commentId", deletComment);

export default router;
