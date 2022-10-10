import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // yarn add @nestjs/jwt passport-jwt, yarn add @types/passport-jwt --dev
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService, //
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

  async loginOAuth({ req, res }) {
    // 1. 가입확인
    let user = await this.usersService.findOne({ email: req.user.email });

    // 2. 회원가입이 안되있다면? 자동회원가입
    if (!user) {
      const { password, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: password };
      user = await this.usersService.create({ ...createUser });
    }

    // 3. 회원가입이 돼있다면? 로그인(refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.setRefreshToken({ user, res });

    // 너 페이지로 돌아가
    res.redirect(
      'http://localhost:5500/day21-22-review/frontend/social-login.html',
    );
  }
}
