import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { User } from "./models/userSchma.js";
import { Token } from "./models/tokenSchema.js";
import { List } from "./models/starbucksSchema.js";
import { checkLengthPhone, getToken, sendTokenSMS } from "./phone.js";
import { preferURL } from "./user-cheerio.js";
import { changePersonal } from "./utils.js";
import { getWelcomeTemplate, sendWelcomeEmail } from "./email.js";
import { options } from "./swagger/config.js";

const app = express();

const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 핸드폰 토큰 API
app.post("/tokens/phone", async (req, res) => {
    const { phone } = req.body;

    // 휴대폰 자리수 검증
    const isValid = checkLengthPhone(phone);
    if (isValid === false) return;

    // 핸드폰 토큰 만들기
    const makeToken = getToken();

    // 같은 번호가 있는지 찾기
    const findPhone = await Token.findOne({ phone });

    // 없으면 새로 만들고 있으면 토큰만 바꾸기
    if (!findPhone) {
        const phoneDB = new Token({
            token: makeToken,
            phone,
            isAuth: false,
        });
        await phoneDB.save();
    } else {
        await Token.findOneAndUpdate(
            { phone: phone },
            { token: makeToken, isAuth: false }
        );
    }

    // 문자보내기
    sendTokenSMS(phone, makeToken);
    return res.send(`핸드폰으로 인증 문자가 전송되었습니다!`);
});

// 토큰 인증 완료 API
app.patch("/tokens/phone", async (req, res) => {
    const { phone, token } = req.body;

    const foundPhone = await Token.findOne({ phone });
    const foundToken = await Token.findOne({ token });

    // 폰 번호가 없다면
    if (!foundPhone) {
        return res.status(422).send(false);
    }

    // 토큰이 일치하지 않는다면
    if (!foundToken) {
        return res.status(422).send(false);
    }

    // 폰,토큰 일치한다면
    if (foundPhone && foundToken) {
        await Token.findOneAndUpdate({ token }, { isAuth: true });
        return res.send(true);
    }
});

// 회원 목록 조회 API
app.get("/users", async (req, res) => {
    const result = await User.find();

    res.send(result);
});

// 회원가입 API
app.post("/user", async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body;
    // console.log(req.body);
    const found = await Token.findOne({ phone });
    const falseAuth = await Token.findOne({ isAuth: false });
    const userPhoneFound = await User.findOne({ phone });
    const ogObj = await preferURL(prefer);
    const change = changePersonal(personal);

    // 핸드폰번호가 중복일 경우 회원가입 또 안되게
    if (userPhoneFound) {
        return res.status(409).send("에러!! 이미 핸드폰 번호가 존재합니다.");
    }

    // 핸드폰 번호 틀리거나 없거나 isAuth가 false인 경우
    if (falseAuth || !found) {
        return res
            .status(422)
            .send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
    } else {
        // 핸드폰 번호가 맞고 isAuth가 true인 경우
        const newUser = new User({
            name,
            email,
            personal: change,
            prefer,
            pwd,
            phone,
            og: ogObj,
        });
        await newUser.save();

        // 가입 이메일 보내기
        const template = getWelcomeTemplate({ name, prefer, phone });
        sendWelcomeEmail(email, template);

        return res.status(200).send(newUser._id);
    }
});

// 스타벅스 메뉴조회 API
app.get("/starbucks", async (req, res) => {
    const result = await List.find();
    res.send(result);
});

// 몽고DB 접속
mongoose.connect("mongodb://my-miniDB:27017/miniDB");

// 서버오픈
app.listen(PORT, () => {
    console.log(`${PORT}에서 서버시작!`);
});
