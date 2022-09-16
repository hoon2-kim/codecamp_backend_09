/*
    공백 제거

    영어 단어가 담긴 문자열 word가 주어집니다.
    해당 단어에는 사이 사이에 공백이 존재합니다.
    공백은 여러 칸일 수도 있습니다. "a   b c"
    해당 공백을 제외시킨 문자열을 리턴해주세요.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    "c od e cam p"

    ------------------------------
    output
    ------------------------------

    "codecamp"
*/

// 나의 답
function noSpaces(str) {
  // 여기에서 작업하세요.
  let result = "";
  for (let x of str) {
    if (x !== " ") result += x;
  }
  return result;
}

// ref Code
function noSpaces(str) {
  return str.split(" ").join("");
}
