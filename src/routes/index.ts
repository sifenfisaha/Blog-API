import authRouter from "./auth.routes";
import blogRouter from "./blog.routes";
import UserRouter from "./user.routes";
import commentRouter from "./comment.routes";
import likeRouter from "./like.routes";
import bookmarkRouter from "./bookmark.routes";
import searchRouter from "./search.routes";
import tagRouter from "./tag.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/user", UserRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/search", searchRouter);
router.use("/tags", tagRouter);

export default router;
