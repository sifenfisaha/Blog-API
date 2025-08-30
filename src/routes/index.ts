import authRouter from "./auth.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);

export default router;
