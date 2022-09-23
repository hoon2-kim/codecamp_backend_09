import { UserOrder } from 'src/apis/userOrders/entities/userOrder.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  isMain: boolean;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => UserOrder)
  userOrder: UserOrder;
}
