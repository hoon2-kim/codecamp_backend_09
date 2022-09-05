import coolsms from "coolsms-node-sdk"; // yarn add coolsms-node-sdk / 문자
import "dotenv/config"; // yarn add dotenv 이걸 설치 해야 process.env.이름 이게 작동함

const mysms = coolsms.default;

export function checkPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const num = 6;
  if (num === undefined) {
    console.log("에러 발생! 갯수를 제대로 입력해 주세요!");
    return;
  }

  if (num < 2) {
    console.log("에러 발생! 갯수가 너무 작습니다!");
    return;
  }

  if (num >= 10) {
    console.log("에러 발생! 갯수가 너무 많습니다!");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );
  // console.log(result);
  return result;
}
// 실습(문자 보내기)
export async function sendTokenToSMS(myphone, result) {
  // 환경변수
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;
  // apiKey, apiSecret 설정 - 여기다 쓰면안됨(중요한거는 깃허브 같은 공개적인 장소에 올리면 안됨)
  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  // 2건 이상의 메시지를 발송할 때는 sendMany(배열사용), 단일 건 메시지 발송은 sendOne을 이용(바로객체)
  const response = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `[코드캠프] 안녕하세요?! 요청하신 인증번호는 [${result}] 입니다.`,
  });
  console.log(response);

  // console.log(myphone + "번호로 인증번호 " + result + "를 전송합니다!!!");
}
