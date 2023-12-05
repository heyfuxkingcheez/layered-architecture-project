import Router from "express";
import "dotenv/config";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { AuthController } from "./../controllers/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

// 로그인 API
authRouter.post("/login", authController.Login);

// 로그아웃 API
authRouter.get("/logout", auth_middleware, authController.Logout);

export { authRouter };
