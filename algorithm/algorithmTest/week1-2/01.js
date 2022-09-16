/*
    객체 속성 추가하기

    두 개의 객체 obj1, obj2가 주어집니다.
    obj1과 obj2의 키-값 쌍을 합쳐서 리턴해주세요.

    - obj1과 obj2를 합치는 과정에서 중복되는 키가 존재한다면, obj1의 키-값 쌍을 기준으로 하여 합칩니다.
    - Object.assign() 메소드의 사용은 금지됩니다.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    const obj1 = {
      a: 1,
      b: 2,
    };
    
    const obj2 = {
      b: 3,
      c: 3,
    };

    ------------------------------
    output
    ------------------------------

    { a: 1, b: 2, c: 3 }
*/

// 나의 답
function addNew(obj1, obj2) {
  // 여기에서 작업하세요.
  let obj = new Object();

  for (let x in obj1) {
    obj[x] = obj1[x];
  }

  for (let x in obj2) {
    if (obj.hasOwnProperty(x)) continue;
    obj[x] = obj2[x];
  }
  return obj;
}

// ref Code
// function addNew(obj1, obj2) {
//   for (let key in obj2) {
//     if (!(key in obj1)) obj1[key] = obj2[key];
//   }
//   return obj1;
// }
