import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

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

    private readonly dataSource: DataSource, // transaction
  ) {}

  // 생성
  async create({
    impUid,
    amount,
    orderState = ORDER_PAYMENT_STATE_ENUM.PAYMENT,
    currentUser,
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // ==================================== transaction 시작!!! ==========================================
    await queryRunner.startTransaction('SERIALIZABLE');
    // ==================================================================================================

    try {
      const orderPayment = this.ordersPaymentsRepository.create({
        impUid,
        amount,
        orderState,
        user: currentUser,
      });
      await queryRunner.manager.save(orderPayment);

      // throw new Error('강제로 에러 발생');

      // 유저 찾기
      const user = await queryRunner.manager.findOne(User, {
        where: { id: currentUser.id },
        lock: { mode: 'pessimistic_write' },
      });

      // 포인트 업데이트
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      // this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      // ====================================== commit 성공 확정!! ======================================
      await queryRunner.commitTransaction();
      // ==============================================================================================

      return orderPayment;
    } catch (error) {
      // ====================================== rollback 되돌리기!! ======================================
      await queryRunner.rollbackTransaction();
      // ===============================================================================================
    } finally {
      // ====================================== 연결 해제!! ==============================================
      await queryRunner.release();
      // ===============================================================================================
    }
  }

  // 결제 중복 체크(테이블 impUid 체크)
  async checkDuplicate({ impUid }) {
    const result = await this.ordersPaymentsRepository.findOne({
      where: { impUid },
    });
    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  // 결제 취소 확인
  async checkAlreadyCanceld({ impUid }) {
    const orderPayment = await this.ordersPaymentsRepository.findOne({
      where: { impUid, orderState: ORDER_PAYMENT_STATE_ENUM.CANCEL },
    });
    if (orderPayment)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  // 내 포인트가 취소할 포인트보다 더 적은지 체크
  async checkHasCancelablePoint({ impUid, currentUser }) {
    const orderPayment = await this.ordersPaymentsRepository.findOne({
      where: {
        impUid,
        orderState: ORDER_PAYMENT_STATE_ENUM.PAYMENT,
        user: { id: currentUser.id },
      },
    });
    if (!orderPayment)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    // 포인트
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.id },
    });

    if (user.point < orderPayment.amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');
  }

  // 테이블에 취소정보 등록
  async cancelCreate({ impUid, amount, currentUser }) {
    const paymentInfo = await this.create({
      impUid,
      amount: -amount,
      currentUser,
      orderState: ORDER_PAYMENT_STATE_ENUM.CANCEL,
    });
    return paymentInfo;
  }
}

// 리팩토링 할거 목록
// 1. 회원등급 enum타입으로 만들어보기
// 2. user에 point 내가 못넣게 만들기 - 해결
