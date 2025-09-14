import authRouter from "./auth.routes";
import blogRouter from "./blog.routes";
import UserRouter from "./user.routes";
import commentRouter from "./comment.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/user", UserRouter);
router.use("/comment", commentRouter);

export default router;
