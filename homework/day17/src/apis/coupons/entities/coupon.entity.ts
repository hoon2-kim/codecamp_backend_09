import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({type: 'varchar', length:100})
  @Field(() => String)
  name: string;

  @Column({type: 'int'})
  @Field(() => Int)
  discountRate: number;

  @Column({type: 'int'})
  @Field(() => Int)
  discountPrice: number;

  @Column()
  @Field(() => Date)
  issuedAt: Date;

  @Column()
  @Field(() => Date)
  expiredAt: Date;

  @Column({ nullable: true })
  @Field(() => Date)
  usedAt: Date;

  @ManyToMany(() => User, (users) => users.coupons)
  @Field(() => [User])
  users: User[];
}
