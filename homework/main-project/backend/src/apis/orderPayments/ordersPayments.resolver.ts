import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { IamportService } from '../iamport/iamport.service';
import {
  OrderPayment,
  ORDER_PAYMENT_STATE_ENUM,
} from './entities/orderPayment.entity';
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
    @Context() context: IContext,
  ) {
    // 결제토큰 변수에 저장
    const paymentToken = await this.iamportService.getAccessToken();
    console.log('paymentToken: ', paymentToken);

    // 결제정보 변수에 저장
    const paymentInfo = await this.iamportService.getPaymentInfo({
      impUid,
      paymentToken,
    });

    console.log('pay: ', paymentInfo);

    // 검증
    await this.ordersPaymentsService.checkPayment({
      impUid,
      amount,
      paymentInfo,
    });

    // // 잘못된 impUid
    // if (impUid !== paymentInfo.imp_uid)
    //   throw new UnprocessableEntityException('유효한 아이디가 아닙니다.');

    // // 결제테이블에 이미 있다면
    // const isPayment = await this.ordersPaymentsService.findPaymentByimpUid({
    //   impUid,
    // });
    // if (isPayment) throw new ConflictException('이미 결제 되었습니다.');

    // // 금액이 일치하지 않는다면
    // if (amount !== paymentInfo.amount)
    //   throw new ConflictException('금액이 맞지 않습니다.');

    // 다 통과하면 저장
    const user = context.req.user;
    // console.log('user: ', user);
    const status = ORDER_PAYMENT_STATE_ENUM.PAYMENT;
    return this.ordersPaymentsService.create({
      impUid,
      amount,
      status,
      user,
    });
  }

  // 결제 취소
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => OrderPayment)
  async cancelPayment(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const paymentToken = await this.iamportService.getAccessToken();

    // // 결제 테이블에서 이미 취소 되어있다면 오류
    // const findState = await this.ordersPaymentsService.findPaymentByimpUid({
    //   impUid,
    // });

    // if (findState.orderState === ORDER_PAYMENT_STATE_ENUM.CANCEL)
    //   throw new UnprocessableEntityException('이미 취소된 결제 입니다.');

    // // 입력한 환불금액이 결제 테이블 금액보다 큰 경우 오류
    // if (amount > findState.amount)
    //   throw new ConflictException('환불금액이 더 큽니다.');

    // 검증
    await this.ordersPaymentsService.checkCancelPayment({ impUid, amount });

    // import 결제 취소
    await this.iamportService.cancel({ impUid, paymentToken });

    // 오류 없고 취소내역 결제테이블 저장
    const user = context.req.user;
    const status = ORDER_PAYMENT_STATE_ENUM.CANCEL;
    return this.ordersPaymentsService.create({
      impUid,
      amount: -amount,
      status,
      user,
    });
  }
}
