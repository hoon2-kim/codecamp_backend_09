import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { OrderPayment } from './entities/orderPayment.entity';

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
}
