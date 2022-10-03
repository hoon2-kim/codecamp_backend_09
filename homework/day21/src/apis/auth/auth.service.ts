import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  getAccessToken({ correctUser }) {
    return this.jwtService.sign(
      { email: correctUser.email, sub: correctUser.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
