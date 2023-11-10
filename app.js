const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const { sequelize } = require("./models");
const app = express();

app.set("port", process.env.PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DATABASE CONECTED!");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan.apply("dev")); //로그
app.use(express.static(path.join(__dirname, "public"))); // 요청 시 기본 경로 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // url 파싱

// 일부러 에러 발생시키기 test용
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  // 템플릿 변수 설정
  res.locals.message = err.message;
  res.locals.error = process.env.NODE.ENV !== "production" ? err : {}; // 배포용이 아니라면 err 설정 아니면 빈 객체

  res.status(err.status || 500);
  res.render("error"); // 템플릿 엔진을 렌더링 하여 응답
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log(`SERVER ON`, Number(process.env.PORT), `...`);
});
