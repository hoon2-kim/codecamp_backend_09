// 템플릿 리터럴 실습
const apple = 3;
const banana = 2;

console.log(
  "철수는 사과를 " +
    apple +
    "개, " +
    "바나나를 " +
    banana +
    "개 가지고 있습니다."
); // 단순 문자열 합치기

console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`); // 템플릿 리터럴 사용

// --------------------

// 회원가입 환영 메세지를 템플릿으로 만드는 함수
function getWelcomeTemplate({ name, age, school, createdAt }) {
  const mytemplate = `
  <html>
    <body>
      <h1>${name}님 가입을 환영합니다~~~</h1>
      <hr />
      <div>이름: ${name}</div>
      <div>나이: ${age}</div>
      <div>학교: ${school}</div>
      <div>가입일: ${createdAt}</div>
    </body>
  </html>
    `;

  console.log(mytemplate);
}

const name = "훈이";
const age = 12;
const school = "공룡초등학교";
const createdAt = "2022-08-30";

getWelcomeTemplate({ name, age, school, createdAt });
// {}로 감싸게 되면 name은 name으로 age는 age로 들어간다 그래서 하나를 빼먹어도 오류가 안난다
// 즉, {}없을 때 age를 빼먹으면 school이 age 자리로 들어가는데 {}를 하면 age를 빼먹어도 shool이 age자리로 가는게 아니라 school 자리로 간다
// 실무에서는 이 방식을 쓴다
