/*
    문자 제거

    길이 3이상의 문자열 str이 주어집니다.
    주어진 문자열에서
    가장 앞의 문자열과 가장 뒤의 문자열을 제거한
    문자열을 리턴해 주세요.
    
    - 문자열 str 내에 공백은 존재하지 않습니다.
    - 문자열 str은 모두 영어 알파벳으로 구성되어 있습니다.
    - (3 <= str.length)
    
    입출력 예시
    ------------------------------
    input
    ------------------------------

    removeCharacters('abcde')

    ------------------------------
    output
    ------------------------------

    'bcd'
    
*/

function removeCharacters(str) {
    // 여기에서 작업하세요.
    return str.slice(1, str.length - 1);
}

// ref Code
// function removeCharacters(str) {
//     let answer = "";
//     for (let i = 0; i < str.length; i++) {
//         if (i !== 0 && i !== str.length - 1) {
//             answer += str[i];
//         }
//     }
//     return answer;
// }

// function removeCharacters(str) {
//     return str.slice(1, str.length - 1);
// }
