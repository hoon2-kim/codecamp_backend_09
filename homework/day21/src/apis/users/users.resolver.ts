import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // 전체조회
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  // 개별조회
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchUser(@Args('email') email: string) {
    return this.usersService.findOne({ email });
  }

  // 로그인유저 조회
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(
    @CurrentUser() currentUser: any, //
    // @Args('email') email: string,
  ) {
    return this.usersService.findOne({ email: currentUser.email });
  }

  // 유저등록(해시적용)
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    // 패스워드 bcrypt
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = hashedPassword;

    return this.usersService.create({ createUserInput });
  }

  // 유저수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update({ userId, updateUserInput });
  }

  // 로그인한 유저 비밀번호 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateLoginPwd(
    @CurrentUser() currentUser: any,
    @Args('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersService.updateLoginPwd({
      userId: currentUser.id,
      password: hashedPassword,
    });
  }

  // 유저삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    return this.usersService.delete({ userId });
  }

  // 로그인한 유저 한 사람 삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(
    @CurrentUser() currentUser: any, //
  ) {
    return this.usersService.delete({ userId: currentUser.id });
  }
}
