// 문자열 다루기 기본

// 문제 설명
// 문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

// 제한 사항
// s는 길이 1 이상, 길이 8 이하인 문자열입니다.
// s는 영문 알파벳 대소문자 또는 0부터 9까지 숫자로 이루어져 있습니다.
// 입출력        예
// s	       return
// "a234"	    false
// "1234"	    true

// 나의 답
function solution(s) {
    return (s.length === 4 || s.length === 6) && /^[0-9]+$/.test(s);
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(s) {
//   if (s.length !== 4 && s.length !== 6) {
//     return false;
//   }

//   for (let i = 0; i < s.length; i++) {
//     if (isNaN(s[i]) === true) {
//       return false;
//     }
//   }
//   return true;
// }

// isNaN은 문자열이 들어왔을 때 숫자로 한번 바꿔본다
// Number.isNaN은 더 isNaN보다 더 엄격하다(진짜 NaN일 때만 true가 나온다)
