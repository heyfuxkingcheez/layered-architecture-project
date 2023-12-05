# 💻CRUD_Node_project

> Goal: 

<br />

> [👉 배포 링크](http://3.36.57.206:4050/api/posts)

<br>

# 📃구현 목표


<br />

# 📁 폴더 구조

```bash
📦Node-Skilled-Project
┣📂bcrypt
┃ ┗ 📜bcrypt.js
┣📂lib
┃ ┗ 📜CustomError.js
┣📂config
┃ ┗ 📜config.js
┣📂middlewares
┃ ┗ 📜auth_middleware.js
┃ ┗ 📜ErrorHandler.js
┣📂migrations
┃ ┗ 📜20231110135910-create-users.js
┃ ┗ 📜20231110140656-create-posts.js
┣📂node_modules
┣📂models
┃ ┗ 📜index.js
┃ ┗ 📜posts.js
┃ ┗ 📜users.js
┣📂routes
┃ ┗ 📜auth.js
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

# ⛏ 기술 스텍

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"><img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"><img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"><img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">


<br />

# 📚 To Do List
      
 **Sequelize**로 구현 된 과제 코드를 **3-Layered Architecture**를 적용해서 구조를 변경합니다.
 Controller, Service, Repository Layer는 **Class**를 이용해 구현합니다.
    - Class의 Method는 **화살표 함수(Arrow Function)** 형태로 구현합니다.
 Repository Layer의 Sequelize로 구현된 코드를 **Prisma**로 변경합니다.
    1. `**(선택)**` **에러 처리 Middleware**를 추가하여, 에러를 한 곳에서 관리합니다.

## 2️⃣ API 동작 확인

1. Thunder Client, Rest Client, Insomnia 등을 이용하여 구현 한 API가 정상 동작하는지 확인합니다.
2. **`(선택)`** **REST Client**를 사용해, 추후 협업 시 이용할 수 있도록 문서(`.http` or `.rest`)를 작성한 후 소스코드와 함께 Git으로 관리합니다.

## 3️⃣ 배포

1. **AWS EC2** 인스턴스에 프로젝트를 배포합니다.
2. **PM2**를 이용해 **Express 서버가 종료** 되거나, **EC2 인스턴스가 재부팅** 되어도 다시 실행되도록 설정합니다.
3. `**(선택)**` **AWS ALB(Application Load Balancer)**를 이용해서 포트 번호를 입력하지 않아도 접속할 수 있도록 설정합니다.

<br>
<br>

# 🤔 더 고민해 보기

1. Class와 Instance가 각각 무엇인지 설명해 주세요.
2. Class의 Method는 화살표 함수(Arrow Function) 형태로 구현하지 않았을 때 발생할 수 있는 문제와 해당 문제를 해결할 수 있는 다른 방법을 적어주세요. (**Hint**: `this bind`)
3. 3-Layered Architecture의 장점과 단점을 아는대로 적어주세요.
4. 숙련주차 과제에서 Mongoose를 Sequelize로 교체 했을 때와 비교하여 이번 과제에서 Sequelize를 Prisma로 교체하는 작업은 더 쉬웠나요? 더 어려웠나요? 왜 그런지 3-Layered Architecture를 기반으로 설명해 주세요.
5. 테스트코드 작성의 장점과 단점을 아는대로 적어주세요.
6. 테스트의 종류 3가지와 각각이 무엇인지 간단히 설명해 주세요.
