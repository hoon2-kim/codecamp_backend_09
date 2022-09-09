import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { Phone } from "./models/token.model.js";

const app = express();

app.use(express.json());

// API
app.post("/tokens/phone", async (req, res) => {
  const { myphone } = req.body;
  console.log(myphone);

  // 1. 휴대폰 자릿수 맞는지 확인하기
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 만들기

  const token = getToken();

  if (await Phone.findOne({ phone: myphone })) {
    await Phone.updateOne({ phone: myphone }, { token });
  } else {
    const phone = new Phone({
      token: token,
      phone: myphone,
      isAuth: false,
    });
    await phone.save();
  }

  // 3. 핸드폰 번호에 토큰 전송
  sendTokenToSMS(myphone, token);
  res.send(`${myphone}으로 ${token}이 전송되었습니다.`);
});

app.patch("/tokens/phone", async (req, res) => {
  const { myphone, token } = req.body;
  console.log(myphone, token);

  if (!(await Phone.findOne({ phone: myphone }))) {
    res.send(false);
    return;
  } else if (!(await Phone.findOne({ token }))) {
    res.send(false);
    return;
  } else {
    await Phone.updateOne({ token }, { isAuth: true });
    res.send(true);
    return;
  }
});

mongoose.connect("mongodb://my-bhomework:27017/myday08");

app.listen(3000, () => {
  console.log(`3000포트에 연결 되었습니다`);
});
