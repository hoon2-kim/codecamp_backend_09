import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/apis/coupons/entities/coupon.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  birth: string;

  @Column()
  @Field(() => String)
  gender: string;

  @Column()
  @Field(() => String)
  userGrade: string;

  @Column()
  @Field(() => Date)
  userassignedAt: Date;

  @Column()
  @Field(() => Boolean)
  isActive: boolean;

  @Column()
  @Field(() => Int)
  pointTotal: number;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => Boolean)
  isAgreedEmail: boolean;

  @JoinTable()
  @ManyToMany(() => Coupon, (coupons) => coupons.users)
  @Field(() => [Coupon])
  coupons: Coupon[];
}
