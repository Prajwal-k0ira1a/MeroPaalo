import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./src/database/index.js";
import { notFound, errorHandler } from "./src/middlewares/error.middleware.js";

// routes
import authRoutes from "./src/routes/auth.routes.js";
import departmentRoutes from "./src/routes/department.routes.js";
import counterRoutes from "./src/routes/counter.routes.js";
import queueDayRoutes from "./src/routes/queueDay.routes.js";
import tokenRoutes from "./src/routes/token.routes.js";
import displayRoutes from "./src/routes/display.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import publicRoutes from "./src/routes/public.routes.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Queue backend running");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/counters", counterRoutes);
app.use("/api/queue-days", queueDayRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/display", displayRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST", "PATCH", "DELETE"] },
    });

    app.set("io", io);

    io.on("connection", (socket) => {
      socket.on("joinDepartment", ({ institutionId, departmentId }) => {
        if (institutionId && departmentId) socket.join(`inst:${institutionId}:dept:${departmentId}`);
      });

      socket.on("joinToken", ({ institutionId, tokenId }) => {
        if (institutionId && tokenId) socket.join(`inst:${institutionId}:token:${tokenId}`);
      });

      socket.on("leaveDepartment", ({ institutionId, departmentId }) => {
        if (institutionId && departmentId) socket.leave(`inst:${institutionId}:dept:${departmentId}`);
      });

      socket.on("leaveToken", ({ institutionId, tokenId }) => {
        if (institutionId && tokenId) socket.leave(`inst:${institutionId}:token:${tokenId}`);
      });
    });

    server.listen(port, () => console.log(`App is listening at http://localhost:${port}`));
  }).catch((err) => {
    console.log("Error connecting DB,", err.message);
    process.exit(1);
  });

  