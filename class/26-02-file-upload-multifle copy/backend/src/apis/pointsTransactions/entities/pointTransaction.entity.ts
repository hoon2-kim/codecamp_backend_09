import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// enum 설정
export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
} // 이렇게하면 지정된 문자열만 들어옴

// graphql enum 타입
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM', // 사용할 이름
});

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string; // 결제 상태

  @ManyToOne(() => User) // 한명이 여러번의 결제를 하니까
  @Field(() => User)
  user: User; // 누가 결제했는지

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}

// 결제 내역 테이블은 insert-only테이블 이라고 함, 즉 등록만 가능하게
