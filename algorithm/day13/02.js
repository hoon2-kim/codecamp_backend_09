// 제일 작은 수 제거하기

// 문제 설명
// 정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

// 제한 조건
// arr은 길이 1 이상인 배열입니다.
// 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.
// 입출력 예
// arr	        return
// [4,3,2,1]	[4,3,2]
// [10]	        [-1]

// -----------------------------------------------------------------------------------------

// 나의 답
function solution(arr) {
    // let min = arr[0];
    let min = Math.min(...arr);

    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i] < min) min = arr[i];
    // }
    let loc = arr.indexOf(min);
    arr.splice(loc, 1);

    return arr.length === 0 ? [-1] : arr;
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(arr) {
//     const answer = [];
//     // 1. 제일 작은 수 찾기
//     let min = arr[0];

//     // 2. 제일 작은 수를 제외한 데이터를 배열에 추가
//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] < min) {
//             min = arr[i];
//         }
//     }

//     // 빈 배열인지 체크해서, 빈 배열이라면 -1이 담긴 배열을 리턴 / 아니라면 2번 과정에서 받아온 배열을 리턴
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] !== min) {
//             answer.push(arr[i]);
//         }
//     }
//     return answer.length === 0 ? [-1] : answer;
// }

// 다른풀이
// function solution(arr) {
//     const min = Math.min(...arr);

//     const answer = arr.filter((num) => {
//         return num !== min;
//     });

//     return answer.length === 0 ? [-1] : answer;
// }
