import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    TOKENKEY,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
} from "../../constants/security.constant.js";

export class AuthService {
    authRepository = new AuthRepository();
    login = async (email, password) => {
        const user = await this.authRepository.login();

        const checkPassword = await bcrypt.compare(password, user.password);

        const accessToken = jwt.sign({ userId: user.userId }, TOKENKEY, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        });

        return { accessToken, user, checkPassword };
    };
}
