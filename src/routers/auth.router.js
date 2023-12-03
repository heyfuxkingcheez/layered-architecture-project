import Router from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    TOKENKEY,
} from "../../constants/security.constant.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { userLoginSchemaValidation } from "../lib/joi-validation.js";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import { AuthController } from "./../controllers/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

// 로그인 API
authRouter.post("/login", authController.Login);

// 로그아웃 API
authRouter.get("/logout", auth_middleware, authController.Logout);

export { authRouter };
