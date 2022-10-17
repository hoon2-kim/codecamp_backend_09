import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UsersService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // 로그인
  @Mutation(() => String)
  async userLogin(
    @Args('email') email: string, //
    @Args('password') password: string,
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

  // 로그아웃
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async userLogout(
    @Context() context: IContext, //
  ) {
    try {
      const auth = context.req.headers;
      // console.log('a: ', context.req);
      // console.log('access: ', auth['authorization']);
      // console.log('refresh: ', auth['cookie']);

      const access = auth['authorization'].replace('Bearer  ', '');
      const refresh = auth['cookie'].replace('refreshToken=', '');

      const accessJwt = jwt.verify(access, 'myAccessKey');
      const refreshJwt = jwt.verify(refresh, 'myRefreshKey');

      // console.log('h:', accessJwt);
      // console.log('j:', refreshJwt);

      // 레디스 토큰 저장
      await this.cacheManager.set(`accessToken:${access}`, 'accessToken', {
        ttl: refreshJwt['exp'] - refreshJwt['iat'], // 바꾸기
      });

      await this.cacheManager.set(`refreshToken:${refresh}`, 'refreshToken', {
        ttl: accessJwt['exp'] - accessJwt['iat'], // 바꾸기
      });
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }

    return '로그아웃에 성공했습니다.';
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
