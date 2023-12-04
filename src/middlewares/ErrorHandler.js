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
    // 게시글 상세 조회 api Error handling
    if (req.route.path === "/post/:productid") {
        // 게시글 수정 api Error handling
        if (req.method === "GET") {
            // 게시글 상세 조회 api Error handling
            if (err.name === "PostNotExistError") {
                return res
                    .status(400)
                    .json({ errorMessage: "해당 게시글이 존재하지 않습니다." });
            }
        }

        // 게시글 삭제 api Error handling
        if (req.method === "DELETE") {
            if (err.name === "NotMatchedIdError") {
                return res
                    .status(400)
                    .send({ errorMessage: "삭제 할 권한이 없습니다." });
            }
        }
    }
    // 게시글 api Error handling
    if (req.route.path === "/posts") {
        // 게시글 목록 조회 api
        if (req.method === "GET") {
            if (err.name === "PostsNotExistError") {
                return res
                    .status(400)
                    .json({ errorMessage: "작성된 글이 없습니다." });
            }
            // 게시글 목록 조회 asc, desc
            if (req.url.includes(req.url.slice(0, 16))) {
                if (err.name === "CantSortError") {
                    return res
                        .status(400)
                        .json({ errorMessage: "옳바르지 않은 접근입니다." });
                }
            }
        }
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

    // 회원 정보 조회 api Error handling
    if (req.route.path === "/users/:userid") {
        if (err.name === "UsersInquiryError") {
            return res
                .status(400)
                .json({ errorMessage: "비정상적인 경로 입니다." });
        }
    }

    //------------------------------------------------
    // 로그인 api Error handling

    if (err.name === "NotUniqueValue") {
        return res.status(400).json({
            errorMessage: "등록된 이메일이 없습니다.",
        });
    }
    if (err.name === "NotMatchPWDError") {
        return res.status(400).json({
            errorMessage: "비밀번호가 다릅니다.",
        });
    }
    if (err.name === "ValidationError") {
        if (err.details[0].path[0] === "password") {
            return res.status(412).json({
                errorMessage: "비밀번호를 입력하세요.",
            });
        }
        if (err.details[0].path[0] === "email") {
            return res.status(412).json({
                errorMessage: "이메일을 입력하세요.",
            });
        }
    }

    // 로그아웃 api Error handling
    if (req.route.path === "/auth/logout") {
        return res.status(400).json({ message: "로그아웃 실패" });
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
    if (err.message === "존재하지 않는 게시글 입니다.") {
        return res
            .status(404)
            .send({ errorMessage: "존재하지 않는 게시글 입니다" });
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
};

export { ErrorHandler };
