// 자연수 뒤집어 배열로 만들기

// 문제 설명
// 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

// 제한 조건
// n은 10,000,000,000이하인 자연수입니다.
// 입출력 예
// n    	return
// 12345	[5,4,3,2,1]

// -----------------------------------------------------------------------------------------

// 나의 답
function solution(n) {
  let result = [];
  const num = String(n).split("").reverse().join("");

  for (let x of num) {
    result.push(Number(x));
  }
  return result;
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(n) {
//   const answer = [];
//   n = String(n);

//   for (let i = n.length - 1; i >= 0; i--) {
//     answer.push(Number(n[i]));
//   }
//   return answer;
// }

// 다른풀이
// function solution(n) {
//   const answer = String(n)
//     .split("")
//     .reverse()
//     .map((num) => {
//       return Number(num);
//     });
//   return answer;
// }

// String() 과 toString()의 차이점
// String에는 데이터 자체를 넣어줘도 변환해줌
// toString()은 변수를 넣어야함
// ex) String(123) = '123' / 123.toString() 오류
