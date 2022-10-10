import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, Profile } from 'passport-google-oauth20'; // jwt방식으로 복호화 하려고

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // 검사하는 부분                          부모
  constructor() {
    // super는 부모의 constructor에 전달해준다
    super({
      // 구글의 인증정보
      clientID: '구글에서 제공받은 아이디',
      clientSecret: '구글에서 제공받은 비밀키',
      callbackURL: 'http://localhost:3000/login/google', // 인증 성공하면 요청할 페이지
      scope: ['email', 'profile'], // 성공하면 어떤 데이터 받아올거야
    });
  }

  // 성공했을 때
  validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile, // 구글로부터 들어오는 데이터
  ) {
    return {
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      age: 0,
    };
  }
}
