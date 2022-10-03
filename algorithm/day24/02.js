// 소수 만들기

// 문제 설명
// 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
// nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.
// 입출력 예
// nums	        result
// [1,2,3,4]	1
// [1,2,7,6,4]	4
// 입출력 예 설명
// 입출력 예 #1
// [1,2,4]를 이용해서 7을 만들 수 있습니다.

// 입출력 예 #2
// [1,2,4]를 이용해서 7을 만들 수 있습니다.
// [1,4,6]을 이용해서 11을 만들 수 있습니다.
// [2,4,7]을 이용해서 13을 만들 수 있습니다.
// [4,6,7]을 이용해서 17을 만들 수 있습니다.

// -----------------------------------------------------------------------------------------

// 나의 답
function solution(nums) {
    let sumArr = [];
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                let sum = 0;
                sum += nums[i] + nums[j] + nums[k];
                sumArr.push(sum);
            }
        }
    }
    let answer = [];
    for (let i = 0; i < sumArr.length; i++) {
        if (isPrime(sumArr[i])) answer.push(sumArr[i]);
    }
    return answer.length;
}

// 소수확인함수
function isPrime(num) {
    if (num === 1) return false;
    for (let i = 2; i <= parseInt(Math.sqrt(num)); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// -----------------------------------------------------------------------------------------

// 멘토님
// function solution(nums) {
//     let answer = 0;

//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             for (let k = j + 1; k < nums.length; k++) {
//                 const sum = nums[i] + nums[j] + nums[k];

//                 // 소수확인
//                 let count = 0;
//                 for (let o = 1; o <= sum; o++) {
//                     if (sum % o === 0) {
//                         count++;

//                         if (count > 2) {
//                             break;
//                         }
//                     }
//                 }
//                 if (count === 2) {
//                     answer++;
//                 }
//             }
//         }
//     }
//     return answer;
// }

// 다른풀이
// function solution(nums) {
//     let ansewr = 0;
//     let index = 0;

//     nums.forEach((num1, i) => {
//         index = i + 1;
//         nums.slice(index).forEach((num2) => {
//             index += 1;
//             nums.slice(index).forEach((num3) => {
//                 const sum = num1 + num2 + num3;
//                 let count = 0;

//                 // sum이 홀수 인경우
//                 if (sum % 2 === 1) {
//                     for (let o = i; o <= sum; i++) {
//                         if (sum % o === 0) {
//                             count++;
//                             if (count > 2) {
//                                 break;
//                             }
//                         }
//                     }
//                 }
//                 if (count === 2) {
//                     answer++;
//                 }
//             });
//         });
//     });
// }
