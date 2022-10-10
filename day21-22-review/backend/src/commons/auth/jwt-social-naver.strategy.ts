import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver'; // yarn add passport-naver , yarn add @types/passport-naver --dev

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  // 검사하는 부분                          부모
  constructor() {
    // super는 부모의 constructor에 전달해준다
    super({
      // 구글의 인증정보
      clientID: process.env.OAUTH_NAVER_ID,
      clientSecret: process.env.OAUTH_NAVER_SECRET,
      callbackURL: process.env.OAUTH_NAVER_CALLBACK, // 인증 성공하면 요청할 페이지
      scope: ['email', 'profile'], // 성공하면 어떤 데이터 받아올거야
    });
  }

  // 성공했을 때
  validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile, // 구글로부터 들어오는 데이터, 그리고 profile은 scope에서 들어옴
  ) {
    console.log('naver 프로필: ', profile);

    return {
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      age: 0,
    };
  }
}
