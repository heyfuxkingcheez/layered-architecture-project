import express from "express";
import { PORT } from "./constants/app.constant.js";
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import { postsRouter } from "./routes/posts.js";
import sequelize from "./models/index.cjs";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();

// sequelize
//     .sync({ force: false })
//     .then(() => {
//         console.log("데이터베이스 연결 성공!");
//     })
//     .catch((err) => {
//         console.error(err);
//     });

app.use(
    morgan("dev"), // 로그
    express.static(path.join(__dirname, "public")), // 요청 시 기본 경로 설정
    express.json(),
    express.urlencoded({ extended: true }), // url 파싱
    cookieParser()
);
app.use("/api", [usersRouter, authRouter, postsRouter]);
app.use(ErrorHandler);
// 에러 처리 미들웨어

// 서버 실행
app.listen(PORT, () => {
    console.log(`SERVER ON`, Number(PORT), `...`);
});
