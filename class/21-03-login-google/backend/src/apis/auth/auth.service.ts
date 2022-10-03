import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // yarn add @nestjs/jwt passport-jwt, yarn add @types/passport-jwt --dev

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  // accessToken
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, // 페이로드
      { secret: 'myAccessKey', expiresIn: '10s' }, // 서명하는 부분
    );
  }

  // refreshToken
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, // 페이로드
      { secret: 'myRefreshKey', expiresIn: '2w' }, // 서명하는 부분
    );

    // 개발환경 - 소셜로그인은 개발환경에도 path 넣어줘야함
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken} path=/;`); // 쿠키에 저장하라 명령

    // 배포환경
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`)
    // path는 이주소에서만 허락해줘, Secure는 HTTPS에서만

    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // 어떤사이트랑 refreshToken 주고받기 가능하게 할거냐
  }
}
