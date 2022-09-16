// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");

  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = `${phone1}${phone2}${phone3}`;

  await axios
    .post("http://localhost:3000/tokens/phone", {
      phone: phoneNumber,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("핸드폰 인증 완료");

  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = `${phone1}${phone2}${phone3}`;

  const auth = {
    phone: phoneNumber,
    token: document.getElementById("TokenInput").value,
  };
  console.log(auth);

  await axios
    .patch("http://localhost:3000/tokens/phone", auth)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 완료");

  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = `${phone1}${phone2}${phone3}`;

  const personal1 = document.getElementById("SignupPersonal1").value;
  const personal2 = document.getElementById("SignupPersonal2").value;
  const myPersonal = `${personal1}-${personal2}`;

  const register = {
    name: document.getElementById("SignupName").value,
    personal: myPersonal,
    phone: phoneNumber,
    prefer: document.getElementById("SignupPrefer").value,
    email: document.getElementById("SignupEmail").value,
    pwd: document.getElementById("SignupPwd").value,
  };

  await axios
    .post("http://localhost:3000/user", register)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
