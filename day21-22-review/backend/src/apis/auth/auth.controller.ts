import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

// 소셜로그인
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  // 구글
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, // profile정보가 req로 들어옴
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }

  // 네이버
  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, // profile정보가 req로 들어옴
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }

  // 카카오 로그인
  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, // profile정보가 req로 들어옴
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }
}

// 1. passport-jwt -> passport-google
// 2. 자동회원가입, 자동로그인(jwt,jwt) 구글의 jwt가 아닌 내가 하고있는 사이트jwt2개 만듬 구글의 access,refreshToken은 버림
