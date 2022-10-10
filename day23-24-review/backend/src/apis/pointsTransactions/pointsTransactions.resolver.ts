import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/types/context';
import { IamportService } from '../iamport/iamport.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService, //
    private readonly iamportService: IamportService,
  ) {}

  // 결제내역 저장
  @UseGuards(GqlAuthAccessGuard) // accessToken으로 인가
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext, // 인가하고 유저정보 여기로 내려옴
  ) {
    // 검증 로직들!!!
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인한다.
    const token = await this.iamportService.getToken(); // 성공하면 토큰 받음
    await this.iamportService.checkPaid({ impUid, token, amount });

    // 2. pointTransaction 테이블에는 impUid가 1번만 존재해야 합니다. (중복 결제를 체크)
    await this.pointsTransactionsService.checkDuplicate({ impUid });

    const user = context.req.user;
    return this.pointsTransactionsService.create({ impUid, amount, user }); // 누가 결제했는지 저장해야하니 유저정보도 필요
  }

  // 결제 취소
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async cancelPointTransaction(
    @Args('impUid') impUid: string,
    @Context() context: IContext,
  ) {
    // 검증로직들!!!
    // 1. 이미 취소된 건인지 확인
    await this.pointsTransactionsService.checkAlreadyCanceld({ impUid });
    // 2. 취소하기에 충분한 내 포인트 작앤이 남아 있는지
    const user = context.req.user;
    await this.pointsTransactionsService.checkHasCancelablePoint({
      impUid,
      user,
    });
    // 3. 실제로 아임포트에 취소 요청하기
    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ impUid, token });

    // 4. pointTransact테이블에 결제 취소 등록하기
    return await this.pointsTransactionsService.cancel({
      impUid,
      amount: canceledAmount,
      user,
    });
  }
}
