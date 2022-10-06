import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import {
  OrderPayment,
  ORDER_PAYMENT_STATE_ENUM,
} from './entities/orderPayment.entity';

@Injectable()
export class OrdersPaymentsService {
  constructor(
    @InjectRepository(OrderPayment)
    private readonly ordersPaymentsRepository: Repository<OrderPayment>, //
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 생성
  async create({ impUid, amount, status, user: _user }) {
    const orderPayment = this.ordersPaymentsRepository.create({
      impUid,
      amount,
      user: _user,
      orderState: status,
      // orderState: ORDER_PAYMENT_STATE_ENUM.PAYMENT,
    });
    await this.ordersPaymentsRepository.save(orderPayment);

    // 유저 찾기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 포인트 업데이트
    this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    return orderPayment;
  }
  // 결제테이블 impUid 찾기
  async findPaymentByimpUid({ impUid }) {
    return await this.ordersPaymentsRepository.findOne({ where: { impUid } });
  }

  // 결제 저장 검증
  async checkPayment({ impUid, amount, paymentInfo }) {
    // 잘못된 impUid
    if (impUid !== paymentInfo.imp_uid)
      throw new UnprocessableEntityException('유효한 아이디가 아닙니다.');

    // 결제테이블에 이미 있다면
    const isPayment = await this.ordersPaymentsRepository.findOne({
      where: { impUid },
    });
    if (isPayment) throw new ConflictException('이미 결제 되었습니다.');

    // 금액이 일치하지 않는다면
    if (amount !== paymentInfo.amount)
      throw new ConflictException('금액이 맞지 않습니다.');
  }

  // 결제 취소 검증
  async checkCancelPayment({ impUid, amount }) {
    // 결제 테이블에서 이미 취소 되어있다면 오류
    const findState = await this.ordersPaymentsRepository.findOne({
      where: { impUid },
    });

    if (findState.orderState === ORDER_PAYMENT_STATE_ENUM.CANCEL)
      throw new UnprocessableEntityException('이미 취소된 결제 입니다.');

    // 입력한 환불금액이 결제 테이블 금액보다 큰 경우 오류
    if (amount > findState.amount)
      throw new ConflictException('환불금액이 더 큽니다.');
  }
}
