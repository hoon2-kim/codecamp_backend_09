import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  // API
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER) // import 해온 CACHE_MANGER를 Inject안에 넣어줌
    private readonly cacheManager: Cache, // redis 도와주는 매니저
  ) {}

  // @Query(() => String, { nullable: true }) // graphql 쿼리 써야함
  // getHello(): string {
  //   return this.boardsService.qqq(); // return 붙여야 프론트로 나감
  // }

  @Query(() => String)
  async fetchBoards() {
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '캐시에서 조회 완료!!';
    ////////////////////////////////////////
    // 레디스 연습을 위해서 잠시 주석 걸기!!!
    // return this.boardsService.findAll(); // [Board]
  }

  @Mutation(() => String)
  async createBoard(
    // @Args("writer") writer: string, // 안에는 어떤이름으로 받고싶은지
    // @Args("title") title: string,
    // @Args("contents") contents: string
    // @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput, // 느낌표 지우고 싶다면
  ) {
    // 1. 캐시에 등록하는 연습 / value에 객체 넣기 가능
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0, // 0은 무제한 , 10은 10초
    });

    return '캐시에 등록 완료!!';
    //////////////////////////////////////////////////////////
    // 레디스 연습을 위해서 잠시 주석 걸기!!!
    // return this.boardsService.create({ createBoardInput });
  }
}

// @Query(()=> graphql의 return타입(대문자로 적어야함) )
// 즉, typeDefs보면 타입적혀있는데 그거임
// 느낌표 없애려면 , {nullable: true}

// ------------------
// 레디스를 사용하기 위하여
// yarn add redis , yarn add cache-manager, yarn add cache-manager-redis-store, yarn add @types/cache-manager-redis-store --dev
// cache-manager 버전 4.1.0으로
