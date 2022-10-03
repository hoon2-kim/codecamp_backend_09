import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // 전체조회
  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  // 개별조회
  @Query(() => User)
  fetchUser(@Args('userId') userId: string) {
    return this.usersService.findOne({ userId });
  }

  // 유저등록
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create({ createUserInput });
  }

  // 유저수정
  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update({ userId, updateUserInput });
  }

  // 유저삭제
  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    return this.usersService.delete({ userId });
  }
}
