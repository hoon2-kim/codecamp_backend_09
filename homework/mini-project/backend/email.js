import nodemailer from "nodemailer";
import { getToday } from "./utils.js";

// 회원가입 템플릿
export function getWelcomeTemplate({ name, prefer, phone }) {
  const mytemplate = `
  <html>
  <body>
    <div style="display: flex; flex-direction: column; align-items: center">
      <div style="width: 500px;">
        <h1>${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div style="color: blue;">이름: ${name}</div>
        <div style="color: green;">좋아하는 사이트: ${prefer}</div>
        <div style="color: purple;">핸드폰 번호: ${phone}</div>
        <div style="color: yellow;">가입일: ${getToday()}</div>
      </div>
    </div>
  </body>
</html>
  `;

  return mytemplate;
}

// 메일 보내기
export async function sendWelcomeEmail(myemail, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const response = await transpoter.sendMail({
    from: EMAIL_SENDER,
    to: myemail,
    subject: "가입을 환영합니다!!!",
    html: mytemplate,
  });
  return response;
}
