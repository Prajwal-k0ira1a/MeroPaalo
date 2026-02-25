import { Router } from "express";
import { asyncHandler } from "../middlewares/async.middleware.js";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));

export default router;
