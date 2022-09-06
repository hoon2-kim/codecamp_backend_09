// 재사용성 높은 코드
export function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const result = `${yyyy}-${mm}-${dd}`;
  return result;
}

// export defalut를 하게 되면 import할 때 아무이름으로 받을 수 있다
// 여러개의 export가 있을 때 한번에 하려면 import * as 원하는 이름 from ''
