import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  discountRate: number;

  @Column()
  discountPrice: number;

  @Column()
  issuedAt: Date;

  @Column()
  expiredAt: Date;

  @Column({ nullable: false })
  usedAt: Date;

  @ManyToMany(() => User, (users) => users.coupons)
  users: User[];
}
