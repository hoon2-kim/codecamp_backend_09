// **027. 가장 큰 수 찾기**

// **`문제 설명`**

// str은 무작위 숫자인 문자열입니다.  해당 문자열에서 가장 큰 수를 구하는 함수를 만들어야 합니다.

// 만약 str에 "12345"가 들어온다면 "5"를 나타내야 합니다.

// **`입력 인자`**

// - str은 문자열입니다.

// **`주의 사항`**

// - str에서 각각의 문자를 숫자로 바꿔서 계산해야 합니다.
// - 비교할 수 있는 기준값이 있어야 합니다.
// - 최댓값을 저장할 수 있는 변수가 있어야 합니다.

// **`예상 결과`**

// bigNum("12345") // 5
// bigNum("87135") // 8

function bigNum(str) {
  let biggest = 0;
  for (let x of str) {
    biggest = Math.max(biggest, Number(x));
  }
  return biggest;
}

// 멘토님
// function bigNum(str) {
//   let biggest = Number(str[0]);

//   for (let i = 1; i < str.length; i++) {
//     if (biggest < Number(str[i])) {
//       biggest = Number(str[i]);
//     }
//   }
//   return biggest;
// }

// biggest 변수에 str[0] 을 하고 반복문 i = 1로 시작하면 반복문 도는 횟수 줄어든다

// 실무에서는 효율적인 방법 사용! - Math.max
// function bigNum(str) {
//   const arr = str.split("");
//   return Math.max(...arr);
// }
