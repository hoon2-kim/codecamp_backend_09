import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}), // Jwt기능들 사용하려면 imports 해야함
    TypeOrmModule.forFeature([
      User, // UserRepository 사용하고있다 알려줘야함
    ]),
  ],
  providers: [
    AuthResolver, // 필요한 의존성은 여기다 다 넣어줘야함
    AuthService, //
    UsersService, // UsersService 여기서 쓰려면 여기다 넣어줘야함
  ],
})
export class AuthModule {}
