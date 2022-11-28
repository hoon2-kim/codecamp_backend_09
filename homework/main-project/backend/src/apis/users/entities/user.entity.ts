import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @Field(() => String, { nullable: true })
  password: string;

  // @Column({ nullable: true })
  // @Field(() => String, { nullable: true })
  // birth: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  gender: string;

  @Column({ default: 'Bronze' })
  @Field(() => String, { defaultValue: 'Bronze' })
  userGrade: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column({ default: 0 })
  // @Field(() => Int)
  point: number;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  isSocialUser: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
