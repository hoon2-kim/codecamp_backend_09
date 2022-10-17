import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  // 검사
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  // 성공
  async validate(req, payload) {
    console.log('payload: ', payload);
    // console.log('req: ', req);

    const valiAccess = req.headers.authorization.replace('Bearer  ', '');
    const redisAccess = await this.cacheManager.get(
      `accessToken:${valiAccess}`,
    );
    console.log('1 :', valiAccess);
    console.log('2 :', redisAccess);

    if (redisAccess) {
      throw new UnauthorizedException();
    } else {
      return {
        email: payload.email,
        id: payload.sub,
      };
    }
  }
}
