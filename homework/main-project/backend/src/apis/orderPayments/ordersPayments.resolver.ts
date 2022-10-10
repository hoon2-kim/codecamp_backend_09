import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { IUser } from 'src/commons/type/context';
import { IamportService } from '../iamport/iamport.service';
import { OrderPayment } from './entities/orderPayment.entity';
import { OrdersPaymentsService } from './ordersPayments.service';

@Resolver()
export class OrdersPaymentsResolver {
  constructor(
    private readonly ordersPaymentsService: OrdersPaymentsService, //
    private readonly iamportService: IamportService,
  ) {}

  // 결제내역 저장
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => OrderPayment)
  async createOrderPayment(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    // @Context() context: IContext,
    @CurrentUser() currentUser: IUser,
  ) {
    // 1. 아임포트 검증
    const paymentToken = await this.iamportService.getAccessToken();
    await this.iamportService.getPaymentInfo({ impUid, paymentToken, amount });

    // 2. 테이블에 impUid 있는지 확인 (중복결제 방지)
    await this.ordersPaymentsService.checkDuplicate({ impUid });

    //
    return this.ordersPaymentsService.create({ impUid, amount, currentUser });
  }

  // 결제 취소
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => OrderPayment)
  async cancelPayment(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    // @Context() context: IContext,
    @CurrentUser() currentUser: IUser,
  ) {
    // console.log('context: ', currentUser);

    // 검증
    // 1. 취소 확인
    await this.ordersPaymentsService.checkAlreadyCanceld({ impUid });

    // 2. 취소가능한지 포인트 검증
    await this.ordersPaymentsService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });

    // 3. 아임포트에 결제 취소 요청
    const paymentToken = await this.iamportService.getAccessToken();
    const cancelPayment = await this.iamportService.cancel({
      impUid,
      paymentToken,
    });

    // 4. 테이블에 결제 취소 등록
    return await this.ordersPaymentsService.cancelCreate({
      impUid,
      amount: cancelPayment,
      currentUser,
    });
  }
}
