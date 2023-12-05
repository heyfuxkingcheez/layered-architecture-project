import { UsersService } from "../services/users.service.js";
import { userSchemaValidation } from "../lib/joi-validation.js";
import { NotMatchPWDError } from "../lib/CustomError.js";

export class UsersController {
    usersService = new UsersService();

    // 회원 가입
    signup = async (req, res, next) => {
        try {
            const { email, nickname, password, confirmPassword } =
                await userSchemaValidation.validateAsync(req.body);

            await this.usersService.signup(email, password, nickname);

            if (password !== confirmPassword) {
                const err = new NotMatchPWDError();
                throw err;
            }

            return res.status(201).json({
                data: {
                    email,
                    nickname,
                },
                message: "회원가입이 완료 되었습니다.",
            });
        } catch (err) {
            next(err);
        }
    };

    // 회원 정보 조회
    userInfo = async (req, res, next) => {
        try {
            const userid = req.params.userid;
            const { userId } = res.locals.user;

            const user = await this.usersService.userInfo(userid, userId);

            return res.status(200).json({ data: user });
        } catch (err) {
            next(err);
        }
    };
}
