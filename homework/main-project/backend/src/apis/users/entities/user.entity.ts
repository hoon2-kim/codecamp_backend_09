import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/apis/coupons/entities/coupon.entity';
import {
  Column,
  DeleteDateColumn,
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
  email: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  birth: string;

  @Column()
  @Field(() => String)
  gender: string;

  @Column({ default: 'Bronze' })
  @Field(() => String, { defaultValue: 'Bronze' })
  userGrade: string;

  // @Column()
  // @Field(() => Date)
  // userassignedAt: Date;

  // @Column()
  // @Field(() => Boolean)
  // isActive: boolean;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  pointTotal: number;

  // @Column()
  // @Field(() => Boolean)
  // isAgreedEmail: boolean;

  @Column()
  @Field(() => String)
  phone: string;

  @JoinTable()
  @ManyToMany(() => Coupon, (coupons) => coupons.users)
  @Field(() => [Coupon])
  coupons: Coupon[];

  @DeleteDateColumn()
  deletedAt: Date;
}
