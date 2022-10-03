import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoriesService } from './productCategories.service';

@Resolver()
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  // 카테고리 등록
  @Mutation(() => ProductCategory)
  createProductCategory(@Args('categoryName') categoryName: string) {
    return this.productCategoriesService.create({ categoryName });
  }
}
