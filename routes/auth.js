const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Users } = require("../models");
const { checkHash } = require("../bcrypt/bcrypt");
const authmiddleware = require("../middlewares/auth_middleware");

// 로그인 API
router.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    // email 또는 password가 데이터베이스에 존재하는지 확인
    const existEmail = await Users.findOne({ where: { email } });
    console.log("정기욱 =>", existEmail);
    if (!existEmail) {
        res.status(400).json({
            errorMessage: "등록된 이메일이 없습니다.",
        });
        return;
    }

    const result = await checkHash(password, existEmail.password);
    if (!result) {
        res.status(400).json({
            errorMessage: "비밀번호가 틀립니다.",
        });
        return;
    }

    // 로그인 성공
    const token = jwt.sign({ userId: existEmail.userId }, process.env.TOKENKEY, { expiresIn: "3min" });
    // jwt cookie로 할당
    res.cookie("authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "로그인 성공!" });
});

// 로그아웃 API
router.get("/auth/logout", authmiddleware, async (req, res) => {
    try {
        res.clearCookie("authorization");
        res.status(200).json({ message: "로그아웃 성공" });
        console.log(req.cookies);
    } catch {
        return res.status(400).json({ message: "로그아웃 실패" });
    }
});

module.exports = router;
