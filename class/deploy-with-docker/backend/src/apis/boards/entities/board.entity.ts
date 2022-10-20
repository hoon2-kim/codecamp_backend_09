import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 테이블로 만들어줘
@ObjectType() // graphql 묶기
export class Board {
  @PrimaryGeneratedColumn('increment') // mysql은 increment랑 uuid만 보면됨
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String) // graphql
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
