import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver()
export class BoardsResolver {
  // API
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => String, { nullable: true }) // graphql 쿼리 써야함
  getHello(): string {
    return this.boardsService.qqq(); // return 붙여야 프론트로 나감
  }
}

// @Query(()=> graphql의 return타입(대문자로 적어야함) )
// 즉, typeDefs보면 타입적혀있는데 그거임
// 느낌표 없애려면 , {nullable: true}
