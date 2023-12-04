import { Router } from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { NotUniqueValue, UsersInquiryError } from "../lib/CustomError.js";
import { userSchemaValidation } from "../lib/joi-validation.js";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = Router();
const usersController = new UsersController();
// 회원 가입
usersRouter.post("/signup", usersController.signup);

// 회원 정보 조회
usersRouter.get("/:userid", auth_middleware, usersController.userInfo);

export { usersRouter };
