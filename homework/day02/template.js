function welcomeSignUp({ email, reg, phone, site }) {
  const template = `
    <html>
      <body>
        <h1>코드캠프님 가입을 환영합니다.</h1>
        <hr>
        <div>이메일: ${email}</div>
        <div>주민번호: ${reg}</div>
        <div>휴대폰 번호: ${phone}</div>
        <div>내가 좋아하는 사이트: ${site}</div>
      </body>
    </html>
  `;
  console.log(template);
}

const email = "support@codebootcamp.co.kr";
const reg = "210510-1******";
const phone = "000-0000-0000";
const site = "codebootcamp.co.kr";

welcomeSignUp({ email, reg, phone, site });
