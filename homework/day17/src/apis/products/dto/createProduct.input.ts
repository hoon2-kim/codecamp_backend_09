import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Min(0)
  @Field(() => Int)
  deliveryPrice: number;

  @Min(0)
  @Field(() => Int)
  maxQ: number;

  //   @Field(() => Date, { nullable: true })
  //   createdAt: Date;

  //   @Field(() => Date, { nullable: true })
  //   updatedAt: Date;

  @Field(() => String)
  contents: string;

  @Min(0)
  @Field(() => Int)
  stock: number;
}
