import { Router } from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { PASSWORD_SALT_ROUNDS } from "../constants/security.constant.js";
import db from "../models/index.cjs";
import { NotUniqueValue, UsersInquiryError } from "../lib/CustomError.js";
import { userSchemaValidation } from "../lib/joi-validation.js";
import { makeHash } from "../bcrypt/bcrypt.js";

let { Users } = db;

const usersRouter = Router();
// 회원가입 API
usersRouter.post("/users/signup", async (req, res, next) => {
    try {
        const { email, nickname, password, confirmPassword } =
            await userSchemaValidation.validateAsync(req.body);
        // 패스워드 유효성 검사
        if (password !== confirmPassword) {
            const err = new NotMatchPWDError();
            throw err;
        }

        // if (password.length < 6) {
        //     const err = new ValidationError();
        //     throw err;
        // }

        // email 또는  nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
        const existEmail = await Users.findOne({ where: { email } });
        if (existEmail) {
            const err = new NotUniqueValue();
            throw err;
        }

        const existsNickname = await Users.findOne({ where: { nickname } });
        if (existsNickname) {
            const err = new NotUniqueValue();
            throw err;
        }

        // 회원가입 성공

        const main = async () => {
            const hashedPassword = await makeHash(
                password,
                PASSWORD_SALT_ROUNDS
            );
            await Users.create({ email, nickname, password: hashedPassword });

            const user = await Users.findOne({
                attributes: ["userId", "email", "nickname"],
                where: { email },
            });
            res.status(201).json({
                message: "회원가입이 완료 되었습니다.",
                data: user,
            });
        };
        main();
    } catch (err) {
        next(err);
    }
});

// 회원 정보 조회
usersRouter.get("/users/:userid", auth_middleware, async (req, res, next) => {
    const userid = req.params.userid;
    const usersOne = await Users.findOne({ where: { userid } });
    const { userId } = res.locals.user;
    console.log(usersOne, typeof userId);
    try {
        if (usersOne.userId !== userId) {
            const err = new UsersInquiryError();
            throw err;
        } else {
            const userDetail = {
                userId: usersOne.userId,
                email: usersOne.email,
                nickname: usersOne.nickname,
                createdAt: usersOne.createdAt,
            };
            return res.json(userDetail);
        }
    } catch (err) {
        next(err);
    }
});

export { usersRouter };
