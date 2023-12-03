import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import router from "./routers/index.js";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();

app.use(
    morgan("dev"), // 로그
    express.static(path.join(__dirname, "public")), // 요청 시 기본 경로 설정
    express.json(),
    express.urlencoded({ extended: true }), // url 파싱
    cookieParser()
);
app.use("/api", router);
app.use(ErrorHandler);
// 에러 처리 미들웨어

// 서버 실행
app.listen(process.env.PORT, () => {
    console.log(`SERVER ON`, Number(process.env.PORT), `...`);
});
