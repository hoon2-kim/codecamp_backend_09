// 문자열 내 p와 y의 개수

// 문제 설명
// 대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

// 예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.

// 제한사항
// 문자열 s의 길이 : 50 이하의 자연수
// 문자열 s는 알파벳으로만 이루어져 있습니다.
// 입출력 예
// s	         answer
// "pPoooyY"	  true
// "Pyy"	      false
// 입출력 예 설명
// 입출력 예 #1
// 'p'의 개수 2개, 'y'의 개수 2개로 같으므로 true를 return 합니다.

// 입출력 예 #2
// 'p'의 개수 1개, 'y'의 개수 2개로 다르므로 false를 return 합니다.

// -----------------------------------------------------------------------------------------

// 나의 답
function solution(s) {
  let sH = new Map();
  s = s.toLowerCase();
  for (let x of s) {
    if (sH.has(x)) sH.set(x, sH.get(x) + 1);
    else sH.set(x, 1);
  }
  if (sH.get("p") === sH.get("y")) return true;
  else return false;
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(s) {
//   // let answer = true;
//   s = s.toLowerCase();
//   let p = 0;
//   let y = 0;

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === "p") {
//       p++;
//     } else if (s[i] === "y") {
//       y++;
//     }
//   }
//   return p === y; // 식이 맞으면 true 틀리면 false 반환함
//   // answer = p === y;
//   // return answer;
// }

// 리팩토링
// function solution(s) {
//   s = s.toLowerCase();
//   const obj = { p: 0, y: 0 };

//   // for (let i = 0; i < s.length; i++) {
//   //   obj[s[i]]++;
//   //   // obj[s[i]] === undefined ? obj[s[i]] = 1 : obj[s[i]]++ // p,y 외의 알파벳값이 NaN으로 나오는게 싫다면
//   // }

//   s.split("").forEach((str) => {
//     obj[str] === undefined ? (obj[str] = 1) : obj[str]++;
//   });

//   return obj.p === obj.y;
// }
