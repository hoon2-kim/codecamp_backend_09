import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // yarn add @nestjs/jwt passport-jwt, yarn add @types/passport-jwt --dev

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // import JwtService한거 써야하니 의존성 주입
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, // 페이로드
      { secret: 'myAccessKey', expiresIn: '1h' }, // 서명하는 부분
    );
  }
}
