const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const dotenv = require("dotenv").config();

module.exports = async (req, res, next) => {
    console.log("여기는 미들웨어 입니다", req.cookies.authorization);
    try {
        const { authorization } = req.cookies;
        const [tokenType, token] = authorization.split(" ");
        console.log("tokenType =>>", tokenType, "token ==>", token);

        // tokenType : Bearer
        // token : 실제 jwt 값
        if (tokenType !== "Bearer" || !tokenType) {
            return res.status(401).json({ message: "토큰 타입이 일치하지 않습니다." });
        }

        const decodedToken = jwt.verify(token, process.env.TOKENKEY);
        const userId = decodedToken.userId;

        const user = await Users.findOne({ where: { userId } });
        if (!user) {
            res.clearCookie("authorization");
            return res.status(401).json({ message: "토큰 사용자가 존재하지 않습니다." });
        }
        res.locals.user = user;
        next();
    } catch (error) {
        res.clearCookie("authorization");
        return res.status(401).json({
            message: "로그인 후 이용 가능합니다.",
        });
    }
};
