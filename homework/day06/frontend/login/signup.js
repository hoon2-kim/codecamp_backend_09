// 휴대폰 인증 토큰
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");

  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = phone1 + phone2 + phone3;
  console.log(phoneNumber);

  await axios
    .post("http://localhost:3000/tokens/phone", {
      phoneNumber,
    })
    .then((res) => {
      console.log(res);
    });
};

// 회원 가입
const submitSignup = async () => {
  console.log("회원 가입 이메일 전송");

  // const name = document.getElementById("SignupName").value;
  // const registerNum = document.getElementById("SignupPersonal").value;
  // const site = document.getElementById("SignupPrefer").value;
  // const email = document.getElementById("SignupEmail").value;
  // const pass = document.getElementById("SignupPwd").value;
  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = phone1 + phone2 + phone3;

  const signUp = {
    name: document.getElementById("SignupName").value,
    registerNum: document.getElementById("SignupPersonal").value,
    site: document.getElementById("SignupPrefer").value,
    email: document.getElementById("SignupEmail").value,
    pass: document.getElementById("SignupPwd").value,
    phoneNumber,
  };

  await axios.post("http://localhost:3000/users", signUp).then((res) => {
    console.log(res);
  });
};
