import { AuthService } from "../services/auth.service.js";
import { userLoginSchemaValidation } from "../lib/joi-validation.js";
import expressSession from "express-session";

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

    // 로그아웃 API
    Logout = async (req, res, next) => {
        try {
            // 로그아웃 blackList 등록용 session
            const { authorization } = req.cookies;
            req.session.blackListToken = authorization;
            console.log("세션 저장 성공!", req.session);

            res.clearCookie("authorization");
            res.status(200).json({ message: "로그아웃 성공" });
        } catch (error) {
            next(error);
        }
    };
}
