// console.log("안녕하세요");

function getToken(num) {
  // 리팩토링 패턴(early exit)
  if (num === undefined) {
    console.log("에러 발생! 갯수를 제대로 입력해 주세요!");
    return;
  }

  if (num < 2) {
    console.log("에러 발생! 갯수가 너무 작습니다!");
    return;
  }

  if (num >= 10) {
    console.log("에러 발생! 갯수가 너무 많습니다!");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );
  console.log(result);

  // 안좋은 코드
  // if (num !== undefined) {
  //   if (num >= 2) {
  //     if (num < 10) {
  //       const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
  //         num,
  //         "0"
  //       );
  //       console.log(result);
  //     } else {
  //       console.log("에러 발생! 갯수가 너무 많습니다!");
  //     }
  //   } else {
  //     console.log("에러 발생! 갯수가 너무 작습니다!");
  //   }
  // } else {
  //   console.log("에러 발생! 갯수를 제대로 입력해 주세요!");
  // }
}

getToken(2);
