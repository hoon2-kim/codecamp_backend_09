import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { Token } from "./models/tokenSchema.js";
import { List } from "./models/starbucksSchema.js";
import {
    checkLengthPhone,
    getToken,
    sendTokenSMS,
} from "./controllers/services/phone.js";
import { options } from "./swagger/config.js";
import { UsersListsController } from "./controllers/userlists.controller.js";
import { RegisterController } from "./controllers/register.controller.js";

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

// 회원 API - MVC패턴
const usersListsController = new UsersListsController();
app.get("/users", usersListsController.findLists); // 회원 목록 조회 API
const registerController = new RegisterController();
app.post("/user", registerController.userRegister); // 회원가입 API

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
