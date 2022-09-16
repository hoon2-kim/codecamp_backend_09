import coolsms from "coolsms-node-sdk";

const mysms = coolsms.default;

// 핸드폰자리 검증
export function checkLengthPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) return false;
  else return true;
}

// 토큰 생성
export function getToken(num = 6) {
  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );

  return result;
}

// 문자보내기
export async function sendTokenSMS(myphone, mytoken) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  const response = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `인증번호는 [${mytoken}] 입니다.`,
  });
}
