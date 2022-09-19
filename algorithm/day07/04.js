// 약수의 합

// 문제 설명
// 정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

// 제한 사항
// n은 0 이상 3000이하인 정수입니다.
// 입출력     예
// n	    return
// 12	      28
// 5	      6
// 입출력 예 설명
// 입출력 예 #1
// 12의 약수는 1, 2, 3, 4, 6, 12입니다. 이를 모두 더하면 28입니다.

// 입출력 예 #2
// 5의 약수는 1, 5입니다. 이를 모두 더하면 6입니다.

// 나의 답
function solution(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) result += i;
    }
    return result;
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(n) {
//   let answer = n; // 반복문을 반만 도니까 자기는 더해줘야함
//   // 약수 => 어떠한 수를 나누어 떨어지게 하는 수
//   for (let i = 1; i <= n / 2; i++) {
//     if (n % i === 0) {
//       answer += i;
//     }
//   }
//   return answer;
// }

// i <= n /2 를 한 이유는 n이 12일 때 예를 들어보면 12의 약수는 1,2,3,4,6,12 인데 12 / 2를 하면 6인데 6을 넘는 약수는 없다

// 다른풀이
// function solutionn(n) {
//   const answer = new Array(n).fill(1).reduce((acc, cur, idx) => {
//     const num = cur + idx;
//     return n % num === 0 ? acc + num : acc;
//   }, 0); // 초기값 넣어줘야 cur 1부터 시작
//   return answer;
// }

// reduce이용할거니까 fill은 아무거나 채움
