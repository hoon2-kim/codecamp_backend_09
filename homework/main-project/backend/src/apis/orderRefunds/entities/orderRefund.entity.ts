import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class OrderRefund {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  refundIssue: string;

  @Column()
  @Field(() => Boolean)
  isRefunded: boolean;

  @Column({ nullable: true })
  @Field(() => Int)
  refundCoupon: number;

  @Column({ nullable: true })
  @Field(() => Int)
  refundPoint: number;

  @Column()
  @Field(() => Int)
  refundPrice: number;

  @Column()
  @Field(() => Int)
  refundTotal: number;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column({ nullable: true })
  @Field(() => Date)
  processedAt: Date;
}
