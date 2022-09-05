// const express = require("express");
import express from "express";

import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
// export한것들을 꺼내오려면 { }로 감싸서 import 해야함
// export default function qqq(){} - default가 붙으면 무조건 나가는거기 때문에 import 아무이름
// from 해도됨({}없어도댐)

import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

import { options } from "./swagger/config.js"; // 옵션들은 따로 뺌

import swaggerUi from "swagger-ui-express"; // swagger-ui-express
import swaggerJsdoc from "swagger-jsdoc"; // swagger-jsdoc
import cors from "cors"; // yarn add cors
import "dotenv/config"; // yarn add dotenv 이걸 설치 해야 process.env.이름 이게 작동함 // 메인파일에서 한번만 해줘

const app = express();

app.use(cors());

app.use(express.json()); // json데이터들을 읽을 수 있게 해줘
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))); // swagger-ui-express, swagger-jsdoc 옵션사용

// API
app.get("/boards", function (req, res) {
  // 1. 데이터를 조회하는 로직(DB에 접속해서 데이터 꺼내오기)
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목입니다~~",
      contents: "내용이에요!!",
    },
    {
      number: 2,
      writer: "영희",
      title: "영희입니다~~",
      contents: "영희이에요!!",
    },
    {
      number: 3,
      writer: "훈이",
      title: "훈이입니다~~",
      contents: "훈이이에요!!",
    },
  ]; // 데이터에서 꺼내와서 변수에 담음(가정)
  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req.body); // app.use(express.json()) 해야 터미널에 나옴

  // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // 추후 DB배우고 작성

  // 3. DB에 저장이 잘 됐으면, 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다."); // .status(210) // status 따로 안붙이면 200
});

// 인증번호API(signup.html에서 요청옴)
app.post("/tokens/phone", (req, res) => {
  // const myphone = req.body.myphone;
  const { myphone } = req.body;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const mytoken = getToken();
  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);
  res.send("인증완료!!!");
});

// 실습(메일 보내기)
app.post("/users", (req, res) => {
  // const name = req.body.name;
  // const age = req.body.age;
  // const school = req.body.school;
  // const email = req.body.email;

  const { name, age, school, email } = req.body;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const mytemplate = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, mytemplate);
  res.send("가입완료");
});

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요!!");
});
