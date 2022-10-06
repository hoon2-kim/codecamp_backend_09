import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  // 검사
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      // scope: ['gender', 'age_range', 'birthday'],
    });
  }

  // 성공
  validate(accessToken, refreshToken, profile) {
    console.log('access: ', accessToken);
    console.log('refresh: ', refreshToken);
    console.log('profile:', profile);

    return {
      email: profile._json.kakao_account.email,
      password: '1234',
      name: profile.displayName,
      birth: profile._json.kakao_account.birthday,
      gender: profile._json.kakao_account.gender,
      userGrade: 'Diamond',
      pointTotal: 0,
      phone: '01099493276',
    };
  }
}
