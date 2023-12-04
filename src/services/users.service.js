import { UsersRepository } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";

export class UsersService {
    usersRepository = new UsersRepository();

    // 회원 가입
    signup = async (email, password, nickname) => {
        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUser = await this.usersRepository.signup(
            email,
            hashedPassword,
            nickname
        );

        return {
            email: createdUser.email,
            password: createdUser.password,
            nickname: createdUser.nickname,
        };
    };

    // 회원 정보 조회
    userInfo = async (userid, userId) => {
        const user = await this.usersRepository.userInfo(userid, userId);

        return {
            userId: user.userId,
            email: user.email,
            nickname: user.nickname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    };
}
