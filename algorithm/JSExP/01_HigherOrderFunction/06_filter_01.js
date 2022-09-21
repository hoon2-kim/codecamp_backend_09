/* 

    filter 메서드는 특정된 배열 데이터의 길이만큼 반복 실행하여
    콜백함수가 리턴되는 결과값이 true 일 경우에만 배열의 요소 데이터를
    새로운 배열에 담아서 리턴합니다.

    ----

    문제

    숫자 데이터가 담겨있는 1차원 배열 arr 와
    콜백 함수인 callback 이 매개변수로 주어졌을 때

    콜백 함수가 리턴한 값이 true 임에 부합하는 배열 데이터를
    새로운 배열에 담아서 리턴해주세요.


    !! filter 매서드가 직접 사용되면 안됩니다.

    ----

    입력 예시
    
    filter_01(
        function( data ) { return data % 2 === 0 },
        [1, 2, 3, 4, 5, 6]
    )
    
    ----

    출력 예시

        [2, 4, 6]
        
*/

// 나의 답
function filter_01(callback, arr) {
    // 여기에 코드를 작성하세요
    let result = [];
    for (let x of arr) {
        if (callback(x)) {
            result.push(x);
        }
    }
    return result;
}

// ref Code
function filter_01(callback, arr) {
    // 여기에 코드를 작성하세요
    let result = [];

    arr.forEach((e, i) => {
        if (callback(e)) {
            result.push(arr[i]);
        }
    });
    return result;
}
