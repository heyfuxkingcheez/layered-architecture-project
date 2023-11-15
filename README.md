## CRUD_Node_project

> Goal: "Node.js와 express를 활용한 나만의 내배캠 장터 백엔드 서버 만들기"

<br />

> [👉배포 링크](http://woogi.shop/api/products)

## 구현 목표

-   Node.js를 이용해서 웹 프레임워크를 구현.
-   MongoDB와 mongoose를 이용하여 원하는 데이터베이스를 설계하고 활용
-   Express.js를 기반으로 CRUD(Create, Read, Update, Delete) 기능이 포함된 REST API 구현.
-   AWS EC2에 Express.js 를 이용한 웹 서비스를 배포
-   API 리스트를 작성, 백엔드 서버를 설계

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

<iframe width="600" height="336" src="https://www.erdcloud.com/p/FSvRMSTyDhFsu3igX" frameborder="0" allowfullscreen></iframe>

<br />

## To Do List

### 1. Directory setting

-   [x] .env
-   [x] .prettierrc
-   [x] .gitignore
-   [x] express
-   [x] nodemon

### 2. 데이터베이스 연결

-   [x] mongodb, mongoose 설치
-   [x] Atlas 설치, 연결
-   [x] 스키마 모델 설정, 확인

### 3. API 구현하기

-   [x] 상품 작성 POST
-   [x] 상품 목록 조회 GET
-   [x] 상품 상세 조회 GET
-   [x] 상품 정보 수정 PUT
-   [x] 상품 삭제 DELETE

### 4. AWS 배포

-   [x] AWS EC2 배포
