import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UsersService, //
  ) {}

  // 로그인
  @Mutation(() => String)
  async userLogin(
    @Args('email') email: string, //
    @Args('password') password: string,
    // @CurrentUser() currentUser: IContext,
    @Context() context: IContext,
  ) {
    // 이메일 일치 유저 찾기
    const correctUser = await this.userService.findOne({ email });

    // 일치하는 유저 없으면 에러
    if (!correctUser)
      throw new UnprocessableEntityException('이메일이 없습니다.!!!!!');

    // 아이디는 맞지만 비밀번호가 틀림
    const isAuth = await bcrypt.compare(password, correctUser.password);

    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.!!!!!');

    // refreshToken(=JWT) 만들기
    this.authService.setRefreshToken({ correctUser, res: context.res });
    // console.log(context.res);

    // 둘 다 맞는다면
    const hashedPassword = await bcrypt.hash(correctUser.password, 10);
    correctUser.password = hashedPassword;
    // console.log(correctUser);

    // accessToken(=JWT) 만들기
    return this.authService.getAccessToken({ correctUser });
  }

  // 만료 토큰 재발급
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    // @CurrentUser() currentUser: IContext, //
    @Context() context: IContext,
  ) {
    return this.authService.getAccessToken({
      correctUser: context.req.user,
    });
  }
}
