/*
    특별한 날

    2월 19일은 hoony에게 특별한 날입니다.
    dayBefore 함수는 매개변수로 월과 일자인 month와 day를 받습니다. 
    해당 월과 일자가 2월 19일보다 이전이면 'Before', 이후라면 'After',
    당일이라면 'Special'을 리턴해주세요. 
		
    - month는 1에서 12사이, day는 1에서 31사이의 정수입니다. 

    입출력 예시
    ------------------------------
    input
    ------------------------------

    specialDay(2, 15)

    ------------------------------
    output
    ------------------------------

    'Before'
*/

// 나의 답
function specialDay(month, day) {
  // 여기에서 작업하세요.
  if (month === 2 && day === 19) return "Special";
  else if ((month === 2 && day > 19) || month > 2) return "After";
  else return "Before";
}

// ref Code
// function specialDay(month, day) {
//   if (month === 2 && day === 19) return `Special`;
//   return new Date(`${month}-${day}`) < new Date("2-19") ? "Before" : "After";
// }

// function specialDay(month, day) {
//   const MyMonth = String(month);
//   const MyDay = String(day);
//   if (Number(MyMonth + MyDay) === 219) return "Special";
//   return Number(MyMonth + MyDay) > 219 ? "After" : "Before";
// }
