import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>, //
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 임시로 쓸 변수는 _ 붙임
  async create({ impUid, amount, user: _user }) {
    // 1. PointTransaction 테이블에 거래기록 1줄 생성
    // 저장에는 두가지 방법
    const pointTransaction = this.pointsTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    }); // create는 빈객체생성이라 await 필요없음

    await this.pointsTransactionsRepository.save(pointTransaction);

    // await this.pointsTransactionsRepository.save({
    //   impUid,
    //   amount,
    //   user: _user,
    //   status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    // });

    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });
    // 3. 유저의 돈 업데이트
    this.usersRepository.update(
      { id: _user.id }, // 조건
      { point: user.point + amount }, // 변경할거, _user아님 왜냐면 user가 돈찾아 오는거니까
    );
    // 4. 최종결과 프론트엔드에 돌려주기
    return pointTransaction;
  }
}
