import express from "express";
import swaggerUi from "swagger-ui-express"; // swagger-ui-express
import swaggerJsdoc from "swagger-jsdoc"; // swagger-jsdoc
import cors from "cors";
import "dotenv/config"; // yarn add dotenv 이걸 설치 해야 process.env.이름 이게 작동함
import { options } from "./swagger/config.js";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  const usersData = [
    {
      email: "aaa@aaa.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "Nick@nick.com",
      name: "Nick",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Judy@judy.com",
      name: "Judy",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Anna@anna.com",
      name: "Anna",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Elsa@elsa.com",
      name: "Elsa",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
  ];
  res.send(usersData);
});

// 과제 2
app.get("/starbucks", (req, res) => {
  const coffeeLists = [
    {
      name: "아메리카노",
      kcal: 5,
    },
    {
      name: "카페라떼",
      kcal: 10,
    },
    {
      name: "콜드브루",
      kcal: 15,
    },
    {
      name: "카페모카",
      kcal: 50,
    },
    {
      name: "돌체라떼",
      kcal: 500,
    },
    {
      name: "카라멜라떼",
      kcal: 200,
    },
    {
      name: "바닐라라떼",
      kcal: 20,
    },
    {
      name: "에스프레소",
      kcal: 1,
    },
    {
      name: "디카페인",
      kcal: 5,
    },
    {
      name: "오트라떼",
      kcal: 300,
    },
  ];
  res.send(coffeeLists);
});

// 과제 1
app.post("/tokens/phone", (req, res) => {
  console.log(req.body);
  const myphone = req.body.phoneNumber;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const mytoken = getToken();
  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);
  res.send("인증완료!!!");
});

// 과제 2
app.post("/users", (req, res) => {
  const { name, site, email, phoneNumber } = req.body;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const mytemplate = getWelcomeTemplate({ name, phoneNumber, site });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, mytemplate);
  res.send("가입완료");
});

app.listen(3000, () => {
  console.log("서버시작!");
});
