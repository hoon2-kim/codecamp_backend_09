function currentTime() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, 0);
  const dd = date.getDate().toString().padStart(2, 0);
  const hours = date.getHours().toString().padStart(2, 0);
  const min = date.getMinutes().toString().padStart(2, 0);
  const sec = date.getSeconds().toString().padStart(2, 0);

  console.log(`오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hours}:${min}:${sec}입니다.`);
}

currentTime();
