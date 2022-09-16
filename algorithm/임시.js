// 콜라스

// function solution(num) {
//     let answer = 0;

//     for (let i = 0; i < 500; i++) {
//         if (num === 1) {
//             break;
//         }
//         answer++;
//         // 짝수인 경우
//         if (num % 2 === 0) {
//             num = num / 2;
//         } else {
//             // 홀수인 꼉우
//             num = num * 3 + 1;
//         }
//     }
//     return num !== 1 ? -1 : answer;
// }

// function solution2(num) {
//     let answer = 0;

//     for (let i = 0; i < 500; i++) {
//         if (num === 1) {
//             return answer;
//         }
//         answer++;
//         // 짝수인 경우
//         if (num % 2 === 0) {
//             num = num / 2;
//         } else {
//             // 홀수인 꼉우
//             num = num * 3 + 1;
//         }
//     }
//     return -1;
// }

// function solution3(num) {
//     let answer = 0;

//     const result = new Array(500).fill(1).forEach((el) => {
//         // forEach는 반복문을 멈출 수 없음
//         if (num !== 1) {
//             answer++;
//             num = num % 2 === 0 ? num / 2 : num * 3 + 1;
//         }
//     });

//     return num !== 1 ? -1 : answer;
// }

// 두개 뽑아서 더하기
function solution(numbers) {
    const answer = [];

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const sum = numbers[i] + numbers[j];
            if (!answer.includes(sum)) {
                answer.push(sum);
            }
        }
    }
    return answer.sort((a, b) => a - b);
}

function solution(numbers) {
    const answer = new Set([]);

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const sum = numbers[i] + numbers[j];
            answer.add(sum);
        }
    }
    // return Array.from(answer)
    return [...answer].sort((a, b) => a - b);
}

function solution(numbers) {
    const answer = new Set([]);

    numbers.forEach((num1, i) => {
        numbers.slice(i + 1).forEach((num2) => {
            const sum = num1 + num2;
            answer.add(sum);
        });
    });
    return [...answer].sort((a, b) => a - b);
}

// new Set
// 1. 배열 형태를 가지는 객체 데이터
// 2. 고유한 값만 저장(중복 데이터 x)
// 데이터 추가하려면 add 사용, 데이터 삭제는 delete, 데이터 조회는 has, 데이터 개수(길이)는 size, 데이터 초기화는 clea

// Set객체를 배열로 변경하는 방법 const newSet = new Set([1,2,3,2,3])
// 1. Array.from(newSet)
// 2. spread연산자 [...newSet]
// Set는 forEach 가능(sort는 안됨)
