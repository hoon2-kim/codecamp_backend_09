import { Coupon } from 'src/apis/coupons/entities/coupon.entity';
import { Point } from 'src/apis/points/entities/point.entity';
import { UserOrder } from 'src/apis/userOrders/entities/userOrder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserOrderPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  couponPrice: number;

  @Column({ nullable: false })
  pointPrice: number;

  @Column()
  price: number;

  @Column()
  priceTotal: number;

  @Column()
  isProcessed: boolean;

  @Column()
  orderState: string;

  @Column()
  processedAt: Date;

  @ManyToOne(() => Coupon)
  coupon: Coupon;

  @ManyToOne(() => Point)
  point: Point;

  @ManyToOne(() => UserOrder)
  userOrder: UserOrder;
}
