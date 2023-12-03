import express from "express";
import { postsRouter } from "./posts.router.js";
import { authRouter } from "./auth.router.js";
import { usersRouter } from "./users.router.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
