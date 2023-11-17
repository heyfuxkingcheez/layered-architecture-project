const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const dotenv = require("dotenv").config();
const { TokenTypeUnMatch, TokenNotExistError, UserNotExistError } = require("../lib/CustomError");

module.exports = async (req, res, next) => {
    // console.log("여기는 미들웨어 입니다", req.cookies.authorization);
    try {
        const { authorization } = req.cookies;
        if (!authorization) {
            const err = new TokenNotExistError();
            throw err;
        }
        const [tokenType, token] = authorization.split(" ");
        // tokenType : Bearer / token : 실제 jwt 값

        if (tokenType !== "Bearer" || !tokenType) {
            const err = new TokenTypeUnMatch();
            throw err;
        }

        const decodedToken = jwt.verify(token, process.env.TOKENKEY);
        const userId = decodedToken.userId;
        const user = await Users.findOne({ where: { userId } });

        if (!user) {
            const err = new UserNotExistError();
            throw err;
        }
        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
