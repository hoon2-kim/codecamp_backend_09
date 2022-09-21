import { Coupon } from 'src/apis/coupons/entities/coupon.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @Column()
  gender: string;

  @Column()
  userGrade: string;

  @Column()
  userassignedAt: Date;

  @Column()
  isActive: boolean;

  @Column()
  pointTotal: number;

  @Column()
  email: string;

  @Column()
  isAgreedEmail: boolean;

  @JoinTable()
  @ManyToMany(() => Coupon, (coupons) => coupons.users)
  coupons: Coupon[];
}
