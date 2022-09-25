import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/apis/coupons/entities/coupon.entity';
import { Point } from 'src/apis/points/entities/point.entity';
import { UserOrder } from 'src/apis/userOrders/entities/userOrder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserOrderPayment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({type:'int' ,nullable: true })
  @Field(() => Int)
  couponPrice: number;

  @Column({type:'int', nullable: true })
  @Field(() => Int)
  pointPrice: number;

  @Column({type: 'int'})
  @Field(() => Int)
  price: number;

  @Column({type: 'int'})
  @Field(() => Int)
  priceTotal: number;

  @Column()
  @Field(() => Boolean)
  isProcessed: boolean;

  @Column({type:'varchar',length:50})
  @Field(() => String)
  orderState: string;

  @Column()
  @Field(() => Date)
  processedAt: Date;

  @ManyToOne(() => Coupon)
  @Field(() => Coupon)
  coupon: Coupon;

  @ManyToOne(() => Point)
  @Field(() => Point)
  point: Point;

  @ManyToOne(() => UserOrder)
  @Field(() => UserOrder)
  userOrder: UserOrder;
}
