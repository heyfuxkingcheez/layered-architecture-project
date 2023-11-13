const express = require("express");
const router = express.Router();

const { Users } = require("../models");

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
    if (String(password) !== existEmail.password) {
        res.status(400).json({
            errorMessage: "비밀번호가 틀립니다.",
        });
        return;
    }

    // 로그인 성공
    return res.status(200).json({ message: "로그인 성공!" });
});

module.exports = router;
