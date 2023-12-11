import jwt from "jsonwebtoken";
import {
    TokenTypeUnMatch,
    TokenNotExistError,
    UserNotExistError,
} from "../lib/CustomError.js";
import { TOKENKEY } from "../../constants/security.constant.js";
import { prisma } from "../utils/prisma/index.js";

const auth_middleware = async (req, res, next) => {
    // console.log("여기는 미들웨어 입니다", req.cookies.authorization);

    try {
        // 로그아웃 blackList 등록용 session 확인
        const { authorization } = req.cookies;
        const blackListTokenCheck = await req.session.blackListToken;
        if (blackListTokenCheck === authorization) {
            const err = new TokenNotExistError();
            throw err;
        }

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

        const decodedToken = jwt.verify(token, TOKENKEY);
        const userId = decodedToken.userId;
        const user = await prisma.users.findFirst({ where: { userId } });

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

export { auth_middleware };
