function checkPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

function getToken() {
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

function sendTokenToSMS(myphone, result) {
  console.log(myphone + "번호로 인증번호 " + result + "를 전송합니다!!!");
}

// API
// 퍼사드패턴 적용
function createTokenOfPhone(myphone) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const mytoken = getToken();
  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);
}

createTokenOfPhone("01012345678");
