import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/types/context';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly usersService: UsersService, // 유저관련된거
  ) {}

  // 로그인 API
  @Mutation(() => String) // 리턴타입은 String
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOne({ email });

    // 2. 일치하는 유저가 없으면?! 에러던지기!!!
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.'); // 충돌이 아니라 로직상의 오류니까

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?!
    const isAuth = await bcrypt.compare(password, user.password); // 순서 중요함 ,앞이 우리가 입력한 비밀번호, 뒤에가 저장된 비밀번호
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(=JWT)을 만들어서 프론트엔드 브라우저 쿠키에 저장해서 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    // 4. 일치하는 유저도 있고, 비밀번호도 맞았다면?!
    // => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.authService.getAccessToken({ user });
    // res.body에는 accessToken이 httpHeader에는 refreshToken이
  }
}
