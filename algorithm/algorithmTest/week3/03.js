/*
    보물찾기

    당신은 보물이 묻혀있는 섬에 도착한 해적단의 선원입니다.
    모래사장에 묻혀있는 보물을 찾아 그 좌표를 선장에게 전달해주세요.

    모래사장은 n * n의 이중배열입니다.
    주어지는 배열 arr에는 문자열 "N"과 문자열 "G"(보물)가 존재합니다.
    문자열 "G"의 좌표 [x, y]를 배열에 담아 리턴해주세요.

    - 주어지는 배열 arr[i]의 요소는 문자열 "N"과 "G"만 존재합니다.
    - 해당 좌표는 각 요소의 index 값을 의미합니다.
    - "G" 문자열의 수가 복수라면 좌표를 이중 배열에, 아니라면 단일 배열에 담아 리턴해주세요.
    - "G" 문자열이 존재하지 않는다면 빈 배열을 리턴해주세요.


    입출력 예시
    ------------------------------
    input
    ------------------------------
    case1:
        [
            ["N", "N", "N", "N"],
            ["N", "G", "N", "N"],
            ["N", "N", "N", "N"],
            ["N", "N", "N", "N"],
        ]

    case2:
        [
            ["N", "G", "N"],
            ["N", "N", "N"],
            ["N", "N", "G"]
        ]
    

    ------------------------------
    output
    ------------------------------
    case1:
        [ 1, 1 ]

    case2:
        [ [ 0, 1 ], [ 2, 2 ] ]

*/

function findGold(arr) {
    // 여기에서 작업하세요.
    let answer = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === "G") {
                answer.push([i, j]);
            }
        }
    }
    return answer.length === 1 ? answer.flat() : answer;
}

// ref Code
// function findGold(arr) {
//     const result = [];
//     arr.forEach((e, i) => {
//         if (e.includes("G")) {
//             result.push([i, e.indexOf("G")]);
//         }
//     });
//     if (result.length === 1) {
//         result = result[0];
//     }
//     return result;
// }

// function findGold(arr) {
//     const answer = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].includes("G")) {
//             answer.push([i, arr[i].indexOf("G")]);
//         }
//     }
//     return answer.length === 1 ? answer[0] : answer;
// }
