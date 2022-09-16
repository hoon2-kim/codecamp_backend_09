import { User } from "../models/userSchma.js";
import { Token } from "../models/tokenSchema.js";
import { preferURL } from "./services/user-cheerio.js";
import { changePersonal } from "./services/utils.js";
import { getWelcomeTemplate, sendWelcomeEmail } from "./services/email.js";

export class RegisterController {
    userRegister = async (req, res) => {
        const { name, email, personal, prefer, pwd, phone } = req.body;
        // console.log(req.body);
        const found = await Token.findOne({ phone });
        const falseAuth = await Token.findOne({ isAuth: false });
        const userPhoneFound = await User.findOne({ phone });
        const ogObj = await preferURL(prefer);
        const change = changePersonal(personal);

        // 핸드폰번호가 중복일 경우 회원가입 또 안되게
        if (userPhoneFound) {
            return res
                .status(409)
                .send("에러!! 이미 핸드폰 번호가 존재합니다.");
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
    };
}
