/* 

    자바스크립트에서의 '고차 함수(Higher Order Function)'는
    다른 함수를 인자로 받거나, 다른 함수를 리턴하는 함수를 뜻합니다.
    이 때, 다른 함수의 인자로 전달되는 함수를 콜백 함수라고 부릅니다.

    고차함수의 조건은 아래와 같습니다.
    - 다른 함수를 인자로 받는 경우
    - 함수를 리턴하는 경우
    - 함수를 인자로 받고, 함수를 리턴하는 경우

    고차함수를 사용하는 기본적인 메서드 중에서는
    forEach, map, filter, reduce 등이 있습니다.

    고차함수를 알아보기 위해 
    함수가 또 다른 함수를 리턴하는 방법에 대해서 알아보도록 합시다.

    ----

    문제
    
    whatIsHoF_01 함수 안에는 HoF 함수가 있습니다.
    whatIsHoF_01 함수는 HoF 함수가 리턴하는 데이터를 다시 리턴합니다.

    매개변수인 arr 가 배열 형태를 가지면서, 5개의 숫자 타입 데이터를 받아올 때
    arr 배열의 각각의 요소 데이터에 1을 더한 값을 배열에 담아서 리턴해주세요.

    ----

    입력 예시

    1. whatIsHoF_01([0, 1, 2, 3, 4])
    
    2. whatIsHoF_01([-2, -1, 0, 1, 2])

    ----

    출력 예시

    1.  [1, 2, 3, 4, 5]

    2.  [-1, 0, 1, 2, 3]
    
*/

// 나의 답
function whatIsHoF_01(arr) {
    function HoF(arr) {
        // 여기에 코드를 작성하세요
        return arr.map((v) => v + 1);
    }

    return HoF(arr);
}

// ref Code
// function whatIsHoF_01(arr) {
//     function HoF(arr) {
//         // 여기에 코드를 작성하세요
//         arr.map((e, i) => arr[i]++);
//         return arr;
//     }
//     return HoF(arr);
// }
