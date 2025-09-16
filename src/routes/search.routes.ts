import Router from "express";
import { searchBlogs } from "../controllers/search.controller";

const router = Router();

router.get("/", searchBlogs);

export default router;
