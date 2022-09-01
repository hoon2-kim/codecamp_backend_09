// 주민번호 뒷자리를 가리는 함수
function customRegistrationNumber(registNum) {
  // 주민번호 검증
  const isValid = checkRegistrationNumber(registNum);
  if (isValid === false) return;
  // 뒷자리 바꾸기
  replaceRegistrationNumber(registNum);
}

function checkRegistrationNumber(reg) {
  const front = reg.split("-")[0];
  const back = reg.split("-")[1];

  if (!reg.includes("-")) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  } else true;

  if (front.length !== 6 || back.length !== 7) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
    return false;
  } else true;
}

function replaceRegistrationNumber(reg) {
  // const regNoReplace = reg.substring(0, 8);
  // let regReplace = reg.substring(8);
  // regReplace = "******";
  // console.log(`${regNoReplace}${regReplace}`);
  const arrReg = reg.split("");
  const replace = arrReg.fill("*", 8).join("");
  console.log(replace);
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("2210510-1010101010101");
customRegistrationNumber("2105101010101");
