import { Router } from "express";
import { isAutenticated } from "../middlewares/auth.middleware";
import {
  deletUser,
  getProfile,
  updateProfile,
} from "../controllers/usre.controller";
import { validate } from "../middlewares/validate.middleware";
import { updateUserSchema } from "../utils/schemas";

const router = Router();

router.use(isAutenticated);

router.get("/me", getProfile);
router.put("/me", validate({ body: updateUserSchema }), updateProfile);
router.delete("/me", deletUser);

export default router;
