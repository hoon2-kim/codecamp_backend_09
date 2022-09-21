/* 

    map 메서드는 특정된 배열 데이터의 길이만큼 반복 실행하여
    리턴되는 함수 안에서 각각의 요소들에 로직을 적용한 결과값을
    새로운 배열에 담아서 리턴합니다.

    ----

    문제

    문자열 데이터가 담겨있는 1차원 배열 arr 와
    콜백 함수인 callback 이 매개변수로 주어졌을 때

    콜백 함수가 리턴한 배열의 요소 데이터들을
    새로운 배열에 담아 리턴해주세요.


    !! map 매서드가 직접 사용되면 안됩니다.

    ----

    입력 예시
    
    map_01(
        function( data ) { return data + "님" },
        ["철수", "훈이", "영희", "맹구"]
    )
    
    ----

    출력 예시

        ["철수님", "훈이님", "영희님", "맹구님"]
        
*/

// 나의 답
function map_01(callback, arr) {
    // 여기에 코드를 작성하세요
    let result = [];
    arr.forEach((x) => {
        result.push(callback(x));
    });
    return result;
}

// ref Code
function map_01(callback, arr) {
    // 여기에 코드를 작성하세요

    for (let i = 0; i < arr.length; i++) {
        arr[i] = callback(arr[i]);
    }
    return arr;
}
// 뭔가 더 간단하게 할 수 있는데 복잡하게 한거 같다.....
