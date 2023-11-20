const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middlewares/auth_middleware");

const { Users } = require("../models");
const { makeHash } = require("../bcrypt/bcrypt");
const { NotUniqueValue, UsersInquiryError } = require("../lib/CustomError");
const { userSchemaValidation, userLoginSchemaValidation } = require("../lib/joi-validation");

// 회원가입 API
router.post("/users", async (req, res, next) => {
    try {
        const { email, nickname, password, confirmPassword } = await userSchemaValidation.validateAsync(req.body);
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
        const saltRounds = 12;
        const main = async () => {
            const hashedPassword = await makeHash(password, saltRounds);
            await Users.create({ email, nickname, password: hashedPassword });

            const user = await Users.findOne({ attributes: ["userId", "email", "nickname"], where: { email } });
            res.status(201).json({ message: "회원가입이 완료 되었습니다.", data: user });
        };
        main();
    } catch (err) {
        next(err);
    }
});

// 회원 정보 조회
router.get("/users/:userid", authmiddleware, async (req, res, next) => {
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

module.exports = router;
