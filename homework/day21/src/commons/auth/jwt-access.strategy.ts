import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  // 검사
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
      secretOrKey: 'myAccessKey',
    });
  }

  // 성공
  validate(payload) {
    console.log('payload: ', payload);

    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
