import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0) // 최솟값 0
  @Field(() => Int)
  price: number;
}

// yarn add class-validator
// yarn add class-transformer
