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

const authRouter = Router();
// 로그인 API
authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } =
            await userLoginSchemaValidation.validateAsync(req.body);
        console.log(password);
        const user = await prisma.users.findFirst({ where: { email } });
        const checkPassword = await bcrypt.compare(password, user.password);

        // email 또는 password가 데이터베이스에 존재하는지 확인
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "존재하지 않는 이메일 입니다.",
            });
        }

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "비밀번호가 일치하지 않습니다.",
            });
        }

        // 로그인 성공
        const accessToken = jwt.sign({ userId: user.userId }, TOKENKEY, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        });
        // jwt cookie로 할당
        res.cookie("authorization", `Bearer ${accessToken}`);
        return res
            .status(200)
            .json({ message: "로그인 성공", data: { accessToken } });
    } catch (err) {
        next(err);
    }
});

// 로그아웃 API
authRouter.get("/logout", auth_middleware, async (req, res, next) => {
    try {
        res.clearCookie("authorization");
        res.status(200).json({ message: "로그아웃 성공" });
    } catch {
        next(err);
    }
});

export { authRouter };
