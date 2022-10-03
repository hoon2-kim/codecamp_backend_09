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
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    AuthResolver, // 필요한 의존성은 여기다 다 넣어줘야함
    AuthService, //
    UsersService, //
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
