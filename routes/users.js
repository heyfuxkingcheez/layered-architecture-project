const express = require("express");
const router = express.Router();

const User = require("../models/users");

// 회원가입 API
router.post("/users", async (req, res) => {
    const { email, nickname, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({
            errorMessage: "패스워드가 패스워드 확인과 다릅니다.",
        });
        return;
    }

    // email 또는  nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
    const existEmail = await User.findOne({
        $or: [{ email }],
    });
    if (existEmail) {
        res.status(400).json({
            errorMessage: "이메일이 이미 사용 중 입니다.",
        });
        return;
    }

    const existsNickname = await User.findOne({
        $or: [{ nickname }],
    });
    if (existsNickname) {
        res.status(400).json({
            errorMessage: "닉네임이 이미 사용 중 입니다.",
        });
        return;
    }

    const user = new User({ email, nickname, password });
    await user.save();

    res.status(200).json({});
});

module.exports = router;
