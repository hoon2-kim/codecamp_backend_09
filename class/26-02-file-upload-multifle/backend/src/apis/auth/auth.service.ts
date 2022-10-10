import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // yarn add @nestjs/jwt passport-jwt, yarn add --dev @types/passport-jwt

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // 의존성 주입
  ) {}

  // accessToken
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, // 페이로드(데이터 저장, JWT는 누구든지 볼 수 있어 많은 데이터를 저장하지 않는게 좋음)
      { secret: 'myAccessKey', expiresIn: '1h' }, // 서명하는 부분, secret은 비밀번호고 문자열 형태로 작성
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
