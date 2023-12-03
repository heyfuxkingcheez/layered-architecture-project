import { Router } from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { NotUniqueValue, UsersInquiryError } from "../lib/CustomError.js";
import { userSchemaValidation } from "../lib/joi-validation.js";
import { prisma } from "../utils/prisma/index.js";

const usersRouter = Router();
// 회원가입 API
usersRouter.post("/signup", async (req, res, next) => {
    try {
        const { email, nickname, password, confirmPassword } =
            await userSchemaValidation.validateAsync(req.body);
        // 패스워드 유효성 검사
        if (password !== confirmPassword) {
            const err = new NotMatchPWDError();
            throw err;
        }

        // email 또는  nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
        const isExistEmail = await prisma.users.findFirst({ where: { email } });
        if (isExistEmail) {
            return res.status(400).json({
                success: false,
                message: "이미 존재하는 이메일 입니다.",
            });
        }

        const isExistsNickname = await prisma.users.findFirst({
            where: { nickname },
        });
        if (isExistsNickname) {
            return res.status(400).json({
                success: false,
                message: "이미 존재하는 닉네임 입니다.",
            });
        }

        // 회원가입 성공

        const main = async () => {
            await prisma.users.create({
                data: {
                    email,
                    password,
                    nickname,
                },
            });

            const user = await prisma.users.findFirst({
                where: { email },
                select: {
                    email: true,
                    nickname: true,
                },
            });

            res.status(201).json({
                data: user,
                message: "회원가입이 완료 되었습니다.",
            });
        };
        main();
    } catch (err) {
        next(err);
    }
});

// 회원 정보 조회
usersRouter.get("/:userid", auth_middleware, async (req, res, next) => {
    const userid = req.params.userid;
    const { userId } = res.locals.user;
    const user = await prisma.users.findFirst({
        where: { userId: +userId },
        select: {
            userId: true,
            email: true,
            nickname: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    console.log(typeof userId, typeof Number(userid));
    try {
        if (Number(userid) !== userId) {
            const err = new UsersInquiryError();
            throw err;
        } else {
            return res.json({ data: user });
        }
    } catch (err) {
        next(err);
    }
});

export { usersRouter };
