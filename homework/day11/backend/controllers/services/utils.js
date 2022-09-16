// 주민번호 뒷자리 바꾸기
export function changePersonal(personal) {
  const front = personal.split("-")[0];
  const back = personal.split("-")[1].replace(/[0-9]/g, "*");
  return `${front}-${back}`;
}

// 날짜
export function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const result = `${yyyy}-${mm}-${dd}`;
  return result;
}
