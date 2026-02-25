import authRoutes from "./src/routes/auth.routes.js";
import departmentRoutes from "./src/routes/department.routes.js";
import counterRoutes from "./src/routes/counter.routes.js";
import queueDayRoutes from "./src/routes/queueDay.routes.js";
import tokenRoutes from "./src/routes/token.routes.js";
import displayRoutes from "./src/routes/display.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import publicRoutes from "./src/routes/public.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import express from 'express';

const router = express.Router()

router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/counters", counterRoutes);
router.use("/queue-days", queueDayRoutes);
router.use("/tokens", tokenRoutes);
router.use("/display", displayRoutes);
router.use("/admin", adminRoutes);
router.use("/public", publicRoutes);
router.use("/users", userRoutes);


export default router