const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    console.log(err);

    //------------------------------------------------
    // 토큰 유효성 검사
    if (err.name === "TokenTypeUnMatch") {
        return res
            .status(401)
            .json({ errorMessage: "토큰 타입이 일치하지 않습니다." });
    }
    // 토큰이 만료 되었을 때
    if (err.name === "TokenExpiredError") {
        res.clearCookie("authorization");
        return res.status(401).json({
            errorMessage: "인증이 만료되었습니다. 재인증을 받아주세요.",
        });
    }
    // 토큰 발급을 받지 않았을 때
    if (err.name === "TokenNotExistError") {
        return res
            .status(401)
            .json({ errorMessage: "로그인 후 이용 가능합니다." });
    }
    // 토큰 사용자가 존재하지 않을 때
    if (err.name === "UserNotExistError") {
        res.clearCookie("authorization");
        return res
            .status(401)
            .json({ errorMessage: "토큰 사용자가 존재하지 않습니다." });
    }
    //------------------------------------------------

    // 회원 가입 api Error handling
    if (err.name === "ValidationError") {
        if (err.details[0].path[0] === "password") {
            return res.status(412).json({
                errorMessage: "비밀번호는 6자리 이상이어야 합니다.",
            });
        }
        if (err.details[0].path[0] === "confirmPassword") {
            return res.status(412).json({
                errorMessage: "비밀번호가 비밀번호 확인과 다릅니다.",
            });
        }
        if (err.details[0].path[0] === "email") {
            return res.status(412).json({
                errorMessage: "이메일을 입력하세요.",
            });
        }
        if (err.details[0].path[0] === "nickname") {
            return res.status(412).json({
                errorMessage: "닉네임을 입력하세요.",
            });
        }
    }

    // 로그인 api Error handling
    if (err.name === "NotMatchPWDError") {
        return res.status(400).json({
            errorMessage: "비밀번호가 다릅니다.",
        });
    }

    // 회원 가입
    if (err.name === "PrismaClientKnownRequestError") {
        if (err.meta.target === "Users_email_key") {
            return res
                .status(400)
                .json({ message: "이미 존재하는 이메일 입니다." });
        }
        if (err.meta.target === "Users_nickname_key") {
            return res
                .status(400)
                .json({ message: "이미 존재하는 닉네임 입니다." });
        }
    }

    // 게시글 수정 api Error handling\
    if (err.message === "존재하지 않는 게시글 입니다") {
        return res
            .status(404)
            .send({ errorMessage: "존재하지 않는 게시글 입니다" });
    }
    if (err.message === "권한이 없습니다.") {
        return res.status(412).json({ errorMessage: "권한이 없습니다." });
    }

    // 게시글 등록 api Error handling
    if (err.name === "ValidationError") {
        if (err.details[0].path[0] === "title") {
            return res.status(412).json({
                errorMessage: "제목을 입력하세요.",
            });
        }
        if (err.details[0].path[0] === "content") {
            return res.status(412).json({
                errorMessage: "내용을 입력하세요.",
            });
        }
        if (err.details[0].path[0] === "price") {
            return res.status(412).json({
                errorMessage: "가격을 입력하세요.",
            });
        }
    }

    return res
        .status(400)
        .json({
            errorMessage:
                "알 수 없는 오류가 발생했습니다, 관리자에게 문의 하십시오.",
        });
};

export { ErrorHandler };
