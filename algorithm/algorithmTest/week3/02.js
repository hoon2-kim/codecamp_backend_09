/*
    양 한 마리, 양 두 마리...

    매개변수 arr로 배열이 주어집니다.
    해당 배열 arr은 문자열을 요소로 가집니다.
    arr의 요소 중에서 문자열 'sheep'이 총 몇개인지
    그 수를 리턴해 주세요.
    
    - arr의 요소는 모두 문자열입니다.
    - Number 타입의 데이터를 리턴해야 합니다.
    - arr의 요소 중 'sheep'이 존재하지 않는다면, 숫자 0을 리턴해 주세요.

    입출력 예시
    ------------------------------
    input
    ------------------------------
    
    const arr = [
      'sheep',
      'wolf',
      'sheep',
      'sheep',
      'human'
    ]

    countingSheep(arr)

    ------------------------------
    output
    ------------------------------

    3
    
*/

// 나의 답
function countingSheep(arr) {
    // 여기에서 작업하세요.
    let answer = 0;
    for (let x of arr) {
        if (x === "sheep") answer++;
    }
    return answer;
}

// ref Code
// function countingSheep(arr) {
//     let answer = 0
//     arr.forEach((e)=> {
//         if(e === 'sheep') answer++
//     })
//     return answer
// }

// function countingSheep(arr) {
//     return arr.reduce((acc,cur)=> {
//         // cur에는 arr의 요소들이 순서대로 들어옵니다.
//         // acc에는 reduce가 반복 실행하며 return된 데이터들이 들어옵니다.
//         return cur === 'sheep' ? acc+1 :acc
//     },0)
// }
