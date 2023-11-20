const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Users } = require("../models");
const { checkHash } = require("../bcrypt/bcrypt");
const authmiddleware = require("../middlewares/auth_middleware");
const { NotUniqueValue, NotMatchPWDError } = require("../lib/CustomError");
const { userLoginSchemaValidation } = require("../lib/joi-validation");

// 로그인 API
router.post("/auth", async (req, res, next) => {
    try {
        const { email, password } = await userLoginSchemaValidation.validateAsync(req.body);
        const existEmail = await Users.findOne({ where: { email } });
        const result = await checkHash(password, existEmail.password);

        // email 또는 password가 데이터베이스에 존재하는지 확인
        if (!existEmail) {
            const err = new NotUniqueValue();
            throw err;
        }

        if (!result) {
            const err = new NotMatchPWDError();
            throw err;
        }

        // 로그인 성공
        const token = jwt.sign({ userId: existEmail.userId }, process.env.TOKENKEY, { expiresIn: "12h" });
        // jwt cookie로 할당
        res.cookie("authorization", `Bearer ${token}`);
        return res.status(200).json({ message: "로그인 성공" });
    } catch (err) {
        next(err);
    }
});

// 로그아웃 API
router.get("/auth/logout", authmiddleware, async (req, res, next) => {
    try {
        res.clearCookie("authorization");
        res.status(200).json({ message: "로그아웃 성공" });
    } catch {
        next(err);
    }
});

module.exports = router;
