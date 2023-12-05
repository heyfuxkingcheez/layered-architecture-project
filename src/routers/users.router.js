import { Router } from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = Router();
const usersController = new UsersController();
// 회원 가입
usersRouter.post("/signup", usersController.signup);

// 회원 정보 조회
usersRouter.get("/:userid", auth_middleware, usersController.userInfo);

export { usersRouter };
