import { AuthService } from "../services/auth.service";

export class AuthController {
    postService = new this.postService();

    // 로그인 API

    Login = async (req, res, next) => {
        try {
            const user = await this.postService.login();

            res.status(200).json({
                message: "로그인 성공",
                data: user.accessToken,
            });
        } catch (err) {}
    };
}
