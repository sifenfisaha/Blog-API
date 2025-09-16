import { Router } from "express";
import { isAutenticated } from "../middlewares/auth.middleware";
import {
  getBookmarks,
  toggleBookmark,
} from "../controllers/bookmark.controller";

const router = Router();

router.post("/:blogId/toggle", isAutenticated, toggleBookmark);
router.get("/", isAutenticated, getBookmarks);

export default router;
