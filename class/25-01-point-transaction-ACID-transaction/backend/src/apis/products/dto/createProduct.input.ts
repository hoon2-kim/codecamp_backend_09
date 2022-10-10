import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0) // 최솟값 0
  @Field(() => Int)
  price: number;

  // 1대1관계라 상품판매위치도 저장해야함
  // @Field(()=>ProductSaleslocation)
  // productSaleslocation: ProductSaleslocation
  // 이거 그대로 사용못함 왜냐면 Product는 input타입 받는데 저건 Object타입임
  @Field(() => ProductSaleslocationInput)
  prodcutSaleslocation: ProductSaleslocationInput;
  // 이렇게 만들어 줘야함

  // N대1관계 이미 등록되어있는 카테고리를 찾아서 상품에 넣어줘야함
  @Field(() => String) // 타입에 ID도 올 수 있는데 숫자열이 들어오면 문자열로 바꿔줌
  productCategoryId: string;

  // N:M
  @Field(() => [String])
  productTags: string[];
}

// yarn add class-validator
// yarn add class-transformer
