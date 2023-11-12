const express = require("express");
const router = express.Router();

const { Users } = require("../models");

// 회원가입 API
router.post("/users", async (req, res) => {
    const { email, nickname, password, confirmPassword } = req.body;

    // 패스워드 유효성 검사
    if (password !== confirmPassword) {
        res.status(400).json({
            errorMessage: "패스워드가 패스워드 확인과 다릅니다.",
        });
        return;
    }

    if (password.length < 7) {
        res.status(400).json({
            errorMessage: "패스워드는 6자리 이상이어야 합니다.",
        });
        return;
    }

    // email 또는  nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
    const existEmail = await Users.findOne({ where: { email } });
    if (existEmail) {
        res.status(400).json({
            errorMessage: "이메일이 이미 사용 중 입니다.",
        });
        return;
    }

    const existsNickname = await Users.findOne({ where: { nickname } });
    if (existsNickname) {
        res.status(400).json({
            errorMessage: "닉네임이 이미 사용 중 입니다.",
        });
        return;
    }

    // 회원가입 성공
    await Users.create({ email, nickname, password });
    res.status(200).json({ message: "회원가입이 완료 되었습니다." });
});

// 회원 정보 조회
router.get("/users/:userid", async (req, res) => {
    const userid = req.params.userid;
    const usersOne = await Users.findOne({ where: { userid } });
    console.log("콘솔 =>", usersOne);
    try {
        const usersOne = await Users.findOne({ where: { userid } });
        console.log("콘솔 =>", usersOne);
        const userDetail = {
            userid: usersOne.userid,
            email: usersOne.email,
            nickname: usersOne.nickname,
            createdAt: usersOne.createdAt,
        };
        res.json(userDetail);
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: "회원정보가 없습니다." });
    }
});

module.exports = router;
