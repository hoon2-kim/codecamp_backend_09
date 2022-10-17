import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({}), // auth.service.ts에서 사용한 jwtService의 주입은 이런 식으로 해줘야함, {}안에는 설정 넣을 수 있음
    TypeOrmModule.forFeature([
      User, // user테이블 조회
    ]),
  ],
  providers: [
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    AuthResolver, // 파일에서 사용된 모든 class들 넣어줘야함
    AuthService, //
    UsersService, //
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
