// 핸드폰 번호 가리기

// 문제 설명
// 프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
// 전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 *으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.

// 제한 조건
// phone_number는 길이 4 이상, 20이하인 문자열입니다.
// 입출력 예
// phone_number	    return
// "01033334444"	"*******4444"
// "027778888"	  "*****8888"

// -----------------------------------------------------------------------------------------

// 나의 답
function solution(phone_number) {
  let front = phone_number
    .substring(0, phone_number.length - 4)
    .replace(/[0-9]/g, "*");
  let back = phone_number.slice(-4);
  return `${front}${back}`;
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(phone_number) {
//   let answer = "";

//   for (let i = 0; i < phone_number.length; i++) {
//     if (i < phone_number.length - 4) {
//       // 뒷 4자리를 제외한 앞의 번호들은 *로 처리
//       answer += "*";
//     } else {
//       answer += phone_number[i];
//     }
//   }
//   return answer;
// }

// 다른 풀이
// function solution(phone_number) {
//   let answer = "";

//   answer = answer.padStart(phone_number.length - 4, "*"); // 재할당 해주는 이유는 answer.padStart()만 하면 사용만되고 사라짐
//   answer += phone_number.slice(phone_number.length - 4);

//   return answer;
// }
