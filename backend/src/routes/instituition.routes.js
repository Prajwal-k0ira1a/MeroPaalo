import { Router } from "express";
import { asyncHandler } from "../middlewares/async.middleware.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { createInstitution, listInstitutions } from "../controllers/institution.controller.js";

const router = Router();

// Admin only (recommended)
router.post("/", protect, authorize("admin"), asyncHandler(createInstitution));
router.get("/", protect, authorize("admin"), asyncHandler(listInstitutions));

export default router;
