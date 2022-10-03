import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  // 검사
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'profile'],
    });
  }

  // 성공
  validate(accessToken, refreshToken, profile) {
    console.log('access: ', accessToken);
    console.log('refresh: ', refreshToken);
    console.log(profile);

    return {
      email: profile.email,
      password: '1234',
      name: profile.name,
      birth: profile.birthday,
      gender: profile.gender,
      userGrade: 'Diamond',
      pointTotal: 0,
      phone: profile.mobile.split('-').join(''),
    };
  }
}
