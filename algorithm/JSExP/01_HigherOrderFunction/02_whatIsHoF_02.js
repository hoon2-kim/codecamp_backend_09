/* 

    문제
    
    whatIsHoF_02 함수는 어떠한 콜백 함수를 매개변수로 받을 수 있습니다.
    추가로, 콜백 함수에 적용될 배열 데이터로 매개변수로 받아옵니다.

    콜백 함수를 callback, 배열 데이터를 arr 인 매개변수를 받아올 때
    배열 각각의 요소에 콜백 함수를 적용한 데이터를 배열에 담아서
    리턴하는 함수를 만들어주세요.

    ----

    입력 예시
    
    1. whatIsHoF_02(
        function(data) { return data + "a" },
        ["a", "b", "c", "d", "e"]
       )
    
    2. whatIsHoF_02(
        function(data) { return data - 1 },
        [1, 10, 7, 5, 10]
       )
    
    ----

    출력 예시
    
    1.  ["aa", "ba", "ca", "da", "ea"]

    2.  [0, 9, 6, 4, 9]
        
*/

// 나의 답
function whatIsHoF_02(callback, arr) {
    // 여기에 코드를 작성하세요
    return arr.map(callback);
}

// ref Code
// function whatIsHoF_02(callback, arr) {
//     // 여기에 코드를 작성하세요
//     let result = [];

//     arr.forEach((e) => {
//         result.push(callback(e));
//     });

//     return result;
// }
// 나는 주로 map을 많이 이용하는거 같은데 forEach도 자주 이용해봐야 할 거 같다!
