import Router from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    TOKENKEY,
} from "../../constants/security.constant.js";
import db from "../models/index.cjs";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { NotUniqueValue, NotMatchPWDError } from "../lib/CustomError.js";
import { userLoginSchemaValidation } from "../lib/joi-validation.js";

let { Users } = db;

const authRouter = Router();
// 로그인 API
authRouter.post("/auth", async (req, res, next) => {
    try {
        const { email, password } =
            await userLoginSchemaValidation.validateAsync(req.body);
        console.log(password);
        const existEmail = await Users.findOne({ where: { email } });
        const existPassword = await Users.findOne({ where: { password } });

        // email 또는 password가 데이터베이스에 존재하는지 확인
        if (!existEmail) {
            const err = new NotUniqueValue();
            throw err;
        }

        if (!existPassword) {
            const err = new NotMatchPWDError();
            throw err;
        }

        // 로그인 성공
        const accessToken = jwt.sign({ userId: existEmail.userId }, TOKENKEY, {
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
authRouter.get("/auth/logout", auth_middleware, async (req, res, next) => {
    try {
        res.clearCookie("authorization");
        res.status(200).json({ message: "로그아웃 성공" });
    } catch {
        next(err);
    }
});

export { authRouter };
