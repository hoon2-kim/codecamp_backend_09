import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

// @InputType()
// export class UpdateProductInput {
//   @Field(() => String)
//   name: string;
//   @Field(() => String)
//   description: string;

//   @Min(0) // 최솟값 0
//   @Field(() => Int)
//   price: number;
// }
// 이렇게 복사 붙여놓기하면 어디서 수정이 일어나면 이거 있는거 마다 찾아서 수정해야함

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 근데 그대로 상속하면 nullable도 따라옴
  // 그래서 필요한게 gql 유틸리티타입(PickType,OmitType,PartialType)
  // 여기다 추가하고싶은거 있으면 추가해도됨
  // @Field(()=> String)
  // qqq: string;
}

//
// PickType - 내가 원하는거만 골라 쓸래 ex) PickType(CreateProductInput, ["name", "price"])

// OmitType - 빼고 싶어 ex) OmitType(CreateProductInput, ["description"])

// PartialType - 전부 ?(있어도 되고 없어도 되는)로 바꿔줌
// Type을 빼면 타입스크립트 유틸리티가 됨
