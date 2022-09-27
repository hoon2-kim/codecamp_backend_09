import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesService } from './productsCategory.service';

@Resolver()
export class ProductsCategoriesResolver {
  // DI
  constructor(
    private readonly productCategoriesService: ProductsCategoriesService,
  ) {}
  // 카테고리 등록하기(API) - (직원이 사용할 API)
  @Mutation(() => ProductCategory) // 객체 전체 리턴 (그래서 playground에서 id와 name 받아올 수 있음)
  createProductCategory(@Args('name') name: string) {
    return this.productCategoriesService.create({ name }); // 여기로 service에서 return한게 들어옴
  }
}
