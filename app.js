const express = require("express");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const path = require("path");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
require("dotenv").config();

const { sequelize } = require("./models");
const app = express();

app.set("port", process.env.PORT);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공!");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(
    morgan("dev"), // 로그
    express.static(path.join(__dirname, "public")), // 요청 시 기본 경로 설정
    express.json(),
    express.urlencoded({ extended: false }), // url 파싱
    cookieparser()
);
app.use("/api", [usersRouter, authRouter, postsRouter]);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.status(400).json({ errorMessage: "로그인 후 이용 가능합니다." });
});

// 서버 실행
app.listen(app.get("port"), () => {
    console.log(`SERVER ON`, Number(process.env.PORT), `...`);
});
