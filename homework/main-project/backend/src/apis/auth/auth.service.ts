import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/createUser.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UsersService,
  ) {}

  // accessToken
  getAccessToken({ correctUser }) {
    return this.jwtService.sign(
      { email: correctUser.email, sub: correctUser.id },
      { secret: 'myAccessKey', expiresIn: '20s' },
    );
  }

  // refreshToken
  setRefreshToken({ correctUser, res }) {
    const refreshToken = this.jwtService.sign(
      { email: correctUser.email, sub: correctUser.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  // 소셜로그인
  async socialLogin({ req, res }) {
    // const reqUser: CreateUserInput = req.user;
    // console.log('a: ', req.user);

    // 1. 가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입이 안되어있다면? 자동회원가입
    if (!user) {
      user = await this.userService.create({
        createUserInput: req.user,
      });
    }

    // 3. 회원가입이 되어있다면? 로그인
    this.setRefreshToken({ correctUser: user, res });

    res.redirect(
      'http://localhost:5500/homework/main-project/frontend/login/index.html',
    );
  }
}
