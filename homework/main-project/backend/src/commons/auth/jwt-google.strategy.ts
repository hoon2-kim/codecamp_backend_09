import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // 검사
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  // 성공
  validate(accessToken, refreshToken, profile) {
    console.log('access: ', accessToken);
    console.log('refresh: ', refreshToken);
    console.log(profile);

    return {
      email: profile.emails[0].value,
      password: '1234',
      name: profile.displayName,
      birth: '20221204',
      gender: 'male',
      userGrade: 'Diamond',
      pointTotal: 0,
      phone: '01099493276',
    };
  }
}
