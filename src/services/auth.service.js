import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
    authRepository = new AuthRepository();
    login = async () => {
        const user = await this.authRepository.login();
    };
}
