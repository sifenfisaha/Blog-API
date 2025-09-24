import { Router } from "express";
import { popularTags } from "../controllers/tag.controller";

const router = Router();

router.get("/", popularTags);

export default router;
