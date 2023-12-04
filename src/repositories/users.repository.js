import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
    // 회원 가입
    signup = async (email, password, nickname) => {
        const createdUser = await prisma.users.create({
            data: {
                email,
                password,
                nickname,
            },
        });

        return { createdUser };
    };

    // 회원 정보 조회
    userInfo = async (userid) => {
        const user = await prisma.users.findFirst({
            where: { userId: +userid },
            select: {
                userId: true,
                email: true,
                nickname: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    };
}
