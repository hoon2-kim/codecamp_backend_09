import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    private readonly usersRepository: Repository<User>, //

    private readonly dataSource: DataSource, // 트랜잭션 시작,종료 가능
  ) {}

  // 임시로 쓸 변수는 _ 붙임
  async create({ impUid, amount, user: _user }) {
    // this.dataSource.createQueryBuilder().select().from().where() // Builder는 복잡한 쿼리짤때
    // transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // await 필수

    // ========================== transactiopn 시작!!! ========================
    await queryRunner.startTransaction('SERIALIZABLE');
    // =======================================================================

    // 시도해라
    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      // 저장에는 두가지 방법
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      }); // create는 빈객체생성이라 await 필요없음

      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction); // 저장, 그래서 하다가 실패하면 queryRunner에 저장한거 복구해줘

      // await this.pointsTransactionsRepository.save({
      //   impUid,
      //   amount,
      //   user: _user,
      //   status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      // });

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' }, // 커밋이 되면 자물쇠 풀림
      }); // 앞은 테이블, 뒤는 조건

      // 3. 유저의 돈 업데이트
      // this.usersRepository.update(
      //   { id: _user.id }, // 조건
      //   { point: user.point + amount }, // 변경할거, _user아님 왜냐면 user가 돈찾
      //
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      // );
      // =========================== commit 성공 확정!!! ======================
      await queryRunner.commitTransaction();
      // ====================================================================

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // ============================= rollback 되돌리기!!! ===================
      await queryRunner.rollbackTransaction();
      // ====================================================================
    } finally {
      // ============================== 연결 해제!! ===========================
      await queryRunner.release();
      //=====================================================================
    }
  }
}
