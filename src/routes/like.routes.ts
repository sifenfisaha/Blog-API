import { Router } from "express";
import { isAutenticated } from "../middlewares/auth.middleware";
import { toggleLike } from "../controllers/like.controller";

const router = Router();

router.post("/:blogId/toggle", isAutenticated, toggleLike);

export default router;
