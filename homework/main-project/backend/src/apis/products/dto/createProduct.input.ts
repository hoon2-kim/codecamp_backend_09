import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductDiscountInput } from 'src/apis/productsDiscount/dto/productDiscount.input';

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

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  stock: number;

  // N : 1 관계
  @Field(() => String)
  productCategoryId: string;

  @Field(() => ProductDiscountInput)
  productDiscount: ProductDiscountInput;

  @Field(() => [String], { nullable: true })
  imgUrls: string[];
}
