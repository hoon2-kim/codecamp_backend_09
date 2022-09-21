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

  @Column({ nullable: false })
  refundCoupon: number;

  @Column({ nullable: false })
  refundPoint: number;

  @Column()
  refundPrice: number;

  @Column()
  refundTotal: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: false })
  processedAt: Date;

  @ManyToOne(() => UserOrder)
  userOrder: UserOrder;
}
