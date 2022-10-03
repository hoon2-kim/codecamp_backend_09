import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  // API
  constructor(private readonly boardsService: BoardsService) {}

  // @Query(() => String, { nullable: true }) // graphql 쿼리 써야함
  // getHello(): string {
  //   return this.boardsService.qqq(); // return 붙여야 프론트로 나감
  // }

  @Query(() => [Board])
  fetchBoards() {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args("writer") writer: string, // 안에는 어떤이름으로 받고싶은지
    // @Args("title") title: string,
    // @Args("contents") contents: string
    // @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput, // 느낌표 지우고 싶다면
  ) {
    return this.boardsService.create({ createBoardInput });
  }
}

// @Query(()=> graphql의 return타입(대문자로 적어야함) )
// 즉, typeDefs보면 타입적혀있는데 그거임
// 느낌표 없애려면 , {nullable: true}
