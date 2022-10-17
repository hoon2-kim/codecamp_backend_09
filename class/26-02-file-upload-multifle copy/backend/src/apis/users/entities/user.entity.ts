import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  email: string;

  // @Field(() => String) // 안날라가게 하기 위해 주석처리
  @Column()
  password: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => Int)
  @Column({ default: 0 }) // 초기값
  point: number;
}
