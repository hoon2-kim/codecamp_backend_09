import coolsms from "coolsms-node-sdk";

const mysms = coolsms.default;

// 검증
export function checkPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

// 토큰 생성
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

  return result;
}

// 보내기
export async function sendTokenToSMS(myphone, mytoken) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  const response = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `${myphone}으로 ${mytoken}이 전송되었습니다.`,
  });
  console.log(response);
}
