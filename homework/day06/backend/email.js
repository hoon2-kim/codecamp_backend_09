import nodemailer from "nodemailer";
import { getToday } from "./utils.js";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, phoneNumber, site }) {
  const mytemplate = `
      <html>
          <body>
            <div style="display: flex; flex-direction: column; align-items: center">
              <div style="width: 500px;">
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div style="color: blue;">이름: ${name}</div>
                <div style="color: green;">전화번호: ${phoneNumber}</div>
                <div style="color: purple;">좋아하는 사이트: ${site}</div>
                <div style="color: gray;">가입일: ${getToday()}</div>
              </div>
            </div>
          </body>
      </html>
  `;
  return mytemplate;
  // console.log(mytemplate)
}
// 실습(메일 보내기)
export async function sendTemplateToEmail(myemail, result) {
  // 환경변수
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  // 설정
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // 보내기
  const response = await transpoter.sendMail({
    from: EMAIL_SENDER,
    to: myemail,
    subject: "[코드캠프] 가입을 축하합니다",
    html: result, // 본문
  });

  console.log(response);

  // console.log(
  //   myemail + "이메일로 가입환영템플릿 " + result + "를 전송합니다!!!"
  // );
}
