import { Field, InputType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { ManyToOne } from 'typeorm';

@InputType()
export class CreateProductImageInput {
  @Field(() => String)
  imgUrl: string;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
