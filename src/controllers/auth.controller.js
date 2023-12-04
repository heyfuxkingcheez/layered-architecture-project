import { AuthService } from "../services/auth.service.js";
import { userLoginSchemaValidation } from "../lib/joi-validation.js";
import { NotUniqueValue, NotMatchPWDError } from "../lib/CustomError.js";

export class AuthController {
    authService = new AuthService();

    // 로그인 API
    Login = async (req, res, next) => {
        try {
            const { email, password } =
                await userLoginSchemaValidation.validateAsync(req.body);
            const user = await this.authService.login(email, password);

            const accesstoken = user.accessToken;
            res.cookie("authorization", `Bearer ${accesstoken}`);

            res.status(200).json({
                message: "로그인 성공",
                data: accesstoken,
            });
        } catch (err) {
            next(err);
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
