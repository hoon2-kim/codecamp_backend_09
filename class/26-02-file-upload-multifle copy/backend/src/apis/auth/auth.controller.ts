import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user?: {
    email: string;
    hashedPassword: string;
    name: string;
    age: number;
  };
}

// 소셜로그인
@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    let user = await this.usersService.findOne({ email: req.user.email });

    // 2. 회원가입이 안되있다면? 자동회원가입
    if (!user) user = await this.usersService.create({ ...req.user });

    // 3. 회원가입이 돼있다면? 로그인(refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.authService.setRefreshToken({ user, res });

    // 너 페이지로 돌아가
    res.redirect(
      'http://localhost:5500/class/21-03-login-google/frontend/social-login.html',
    );
  }
}

// 1. passport-jwt -> passport-google
// 2. 자동회원가입, 자동로그인(jwt,jwt) 구글의 jwt가 아닌 내가 하고있는 사이트jwt2개 만듬 구글의 access,refreshToken은 버림
