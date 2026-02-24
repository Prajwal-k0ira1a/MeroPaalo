import { Router } from "express";
import { asyncHandler } from "../middlewares/async.middleware.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { assignRole, listUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protect, authorize("admin"), asyncHandler(listUsers));
router.patch("/:userId/role", protect, authorize("admin"), asyncHandler(assignRole));

export default router;
