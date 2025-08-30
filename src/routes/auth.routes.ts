import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../utils/schemas";
import { register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate({ body: registerSchema }), register);

export default router;
