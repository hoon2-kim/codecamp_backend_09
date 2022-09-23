import { UserOrder } from 'src/apis/userOrders/entities/userOrder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderRefund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refundIssue: string;

  @Column()
  isRefunded: boolean;

  @Column({ nullable: true })
  refundCoupon: number;

  @Column({ nullable: true })
  refundPoint: number;

  @Column()
  refundPrice: number;

  @Column()
  refundTotal: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  processedAt: Date;

  @ManyToOne(() => UserOrder)
  userOrder: UserOrder;
}
