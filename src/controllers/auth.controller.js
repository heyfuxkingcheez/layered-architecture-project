import { AuthService } from "../services/auth.service.js";
import { userLoginSchemaValidation } from "../lib/joi-validation.js";

export class AuthController {
    authService = new AuthService();

    // 로그인 API
    Login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            const accesstoken = user.accessToken;
            res.cookie("authorization", `Bearer ${accesstoken}`);
            // console.log(user.checkPassword);

            if (!user.user) {
                return res.status(401).json({
                    success: false,
                    message: "존재하지 않는 이메일 입니다.",
                });
            }

            if (!user.checkPassword) {
                return res.status(401).json({
                    success: false,
                    message: "비밀번호가 일치하지 않습니다.",
                });
            }

            res.status(200).json({
                message: "로그인 성공",
                data: accesstoken,
            });
        } catch (err) {
            console.log(err);
        }
    };

    Logout = async (req, res, next) => {
        try {
            res.clearCookie("authorization");
            res.status(200).json({ message: "로그아웃 성공" });
        } catch {
            next(err);
        }
    };
}
