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
