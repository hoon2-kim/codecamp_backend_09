/* 

    map 메서드는 특정된 배열 데이터의 길이만큼 반복 실행하여
    리턴되는 함수 안에서 각각의 요소들에 로직을 적용한 결과값을
    새로운 배열에 담아서 리턴합니다.

    ----

    문제

    문자열 데이터가 담겨있는 1차원 배열 arr 가 매개변수로 주어집니다.

    함수 안에서 또 다른 함수인 HoF 함수를 리턴했을 때
    HoF 함수의 리턴 값이 콜백이 적용된 각 데이터를 리턴하거나,
    HoF 함수의 리턴 값이 콜백이 적용된 전체 데이터들을 
    새로운 배열에 담아 리턴하는 함수를 작성해주세요.

    
    !! map 매서드가 직접 사용되면 안됩니다.
    !! 반드시 HoF 함수를 사용해서 풀어주세요.
    !! HoF 함수의 매개변수는 마음대로 추가하셔도 됩니다.

    ----

    입력 예시
    
    map_02(["철수", "훈이", "영희", "맹구"])
    
    ----

    출력 예시

        ["철수님", "훈이님", "영희님", "맹구님"]

*/

// 나의 답
function map_02(arr) {
    function HoF(newArr) {
        // 여기에 코드를 작성하세요
        let result = [];
        for (let x of newArr) {
            result.push(x + "님");
        }
        return result;
    }
    return HoF(arr);
}

// ref Code
function map_02(arr) {
    function HoF(arr) {
        // 여기에 코드를 작성하세요
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i] + "님";
        }
        return arr;
    }

    return HoF(arr);
}
// 나는 계속 새로운 빈 배열을 만들어서 push하고 있는데 ref Code같이 원본배열을 그냥 바꾸는 방법도 써봐야겠다
