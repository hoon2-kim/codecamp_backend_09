import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/apis/orders/entities/order.entity';

import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ORDER_PAYMENT_STATE_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(ORDER_PAYMENT_STATE_ENUM, {
  name: 'ORDER_PAYMENT_STATE_ENUM',
});

@Entity()
@ObjectType()
export class OrderPayment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: ORDER_PAYMENT_STATE_ENUM })
  @Field(() => ORDER_PAYMENT_STATE_ENUM)
  orderState: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Order)
  order: Order;
}
