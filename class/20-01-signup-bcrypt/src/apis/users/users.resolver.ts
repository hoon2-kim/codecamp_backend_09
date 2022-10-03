import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrpyt from 'bcrypt'; // yarn add bcrypt, yarn add @types/bcrypt --dev

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  //
  @Mutation(() => User)
  async createUser(
    @Args('email') email: string, // 받은 데이터를 변수에 저장
    @Args('password') password: string, // 이렇게 하면 password가 조회되고 프론트로 날라감, password는 db에 저장되고 날라가면 안됨
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number, // number만 하면 graphql에서 Float(소수점)으로 나옴
  ) {
    // 패스워드 단방향 암호화하기
    const hashedPassword = await bcrpyt.hash(password, 10); // (패스워드, salt)
    console.log(hashedPassword);

    return this.usersService.create({ email, hashedPassword, name, age }); // 주는쪽
  }
}
