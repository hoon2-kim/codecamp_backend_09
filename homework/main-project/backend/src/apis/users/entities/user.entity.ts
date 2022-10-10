import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
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

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  birth: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  gender: string;

  @Column({ default: 'Bronze' })
  @Field(() => String, { defaultValue: 'Bronze' })
  userGrade: string;

  @Column()
  @Field(() => String)
  phone: string;

  // 과제용 임시
  @Column({ default: 0 })
  // @Field(() => Int)
  point: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
