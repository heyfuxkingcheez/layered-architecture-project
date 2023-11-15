## CRUD_Node_project

> Goal: RDB(MySQL) 데이터 모델링, JWT, Express Middleware를 이용한 인증 로직 추가

<br />

> [👉배포 링크](http://woogi.shop:3080/api/posts)

## 구현 목표

1. **API 명세서를 작성**하여, ****최종적 결과물을 미리 파악합니다.
2. **MySQL, Sequelize를** 이용해 데이터베이스를 설계하고 활용합니다.
    - 데이터 모델링을 통해 **ERD 작성**
    - Sequelize를 이용한 **마이그레이션 코드 및 스키마 코드 작성**
    - **JOIN**을 통해 다른 Table의 데이터와 결합
3. **인증 관련 기능을 구현**합니다.
    - **JWT**(AccessToken)의 이해
    - 회원가입 API, 로그인 API, 내 정보 조회 API, 인증 **Middleware** 구현
    - 상품 관련 기능에 인증 로직 추가

<br />

## 🗄 폴더 구조

```bash
📦Node-Skilled-Project
┣📂bcrypt
┃ ┗ 📜bcrypt.js
┣📂config
┃ ┗ 📜config.js
┣📂middlewares
┃ ┗ 📜auth_middleware.js
┣📂migrations
┃ ┗ 📜20231110135910-create-users.js
┃ ┗ 📜20231110140656-create-posts.js
┣📂node_modules
┣📂models
┃ ┗ 📜index.js
┃ ┗ 📜posts.js
┃ ┗ 📜users.js
┣📂models
┃ ┗ 📜index.js
┃ ┗ 📜posts.js
┃ ┗ 📜users.js
┣📂seaders
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜app.js
┣ 📜package.json
┣ 📜yarn.lock
┗ 📜README.md
```

<br />

## ⛏ 사용 기술

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

<br />

## API

## ERD link

![image](https://github.com/heyfuxkingcheez/Node-skilled-project/assets/143869354/b6156489-ee12-42fb-8e57-77332e2cfc07)


<br />

## To Do List

### 1. Directory setting
-   [x] GIT 레포지 생성
-   [x] 모델링을 통해 ERD 작성
-   [x] EXPRESS
-   [x] YARN
-   [x] db 클라우드 서비스 RDS사용
-   [x] 시퀄라이즈
-   [x] dotenv
-   [x] gitignore
-   [x] prettierrc
-   [x] nodemon
-   [ ] SWAGGER API 명세서

### 2. 데이터베이스 연결

-   [x] MySQL, MySQL RDS 설치
-   [x] MySQL생성 및 연결
-   [x] 모델스, 마이그레이션 확인 테이블 생성

### 3. API 구현하기

-   [x] 회원가입 API
-   [x] 로그인 API
-   [x] 로그아웃 API
-   [x] 상품 생성 API
-   [x] 상품 수정 API
-   [x] 상품 삭제 API
-   [X] 상품 목록 API
-   [X] 상품 상세 API
-   [X] 인증 미들웨어

### 4. AWS 배포

-   [x] AWS EC2 배포
-   [X] PM2

