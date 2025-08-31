import authRouter from "./auth.routes";
import blogRouter from "./blog.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/blog", blogRouter);

export default router;
