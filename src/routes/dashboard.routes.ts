import Router from "express";
import { isAutenticated } from "../middlewares/auth.middleware";
import { dahboardStat } from "../controllers/dahboard.controller";

const router = Router();

router.get("/stats", isAutenticated, dahboardStat);

export default router;
