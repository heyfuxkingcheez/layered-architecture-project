import { prisma } from "../utils/prisma/index.js";

export class AuthRepository {
    login = async (email) => {
        const user = await prisma.users.findUnique({ where: { email } });

        return user;
    };
}
