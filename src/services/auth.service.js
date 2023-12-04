import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    TOKENKEY,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
} from "../../constants/security.constant.js";
import { NotMatchPWDError } from "../lib/CustomError.js";

export class AuthService {
    authRepository = new AuthRepository();
    login = async (email, password) => {
        const user = await this.authRepository.login(email);
        if (!user) return new Error("존재하지 않는 계정입니다.");

        if (!user.checkPassword) {
            const err = new NotMatchPWDError();
            throw err;
        }

        const checkPassword = bcrypt.compareSync(password, user?.password);

        const accessToken = jwt.sign({ userId: user.userId }, TOKENKEY, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        });

        return { accessToken, user, checkPassword };
    };
}
