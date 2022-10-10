import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/types/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  // 결제내역 저장
  @UseGuards(GqlAuthAccessGuard) // accessToken으로 인가
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext, // 인가하고 유저정보 여기로 내려옴
  ) {
    const user = context.req.user;
    return this.pointsTransactionsService.create({ impUid, amount, user }); // 누가 결제했는지 저장해야하니 유저정보도 필요
  }
}
