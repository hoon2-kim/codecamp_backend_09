import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productsService: ProductService) {}

  // 전체 조회
  @Query(() => [Product])
  fetchProducts() {
    return this.productsService.findAll();
  }

  // 개별 조회
  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productsService.findOne({ productId });
  }

  // 삭제 상품까지 전부 조회
  @Query(() => [Product])
  fetchProductsWithDeleted() {
    return this.productsService.fetchDelete();
  }

  // 상품 만들기
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productsService.create({ createProductInput });
  }

  // 상품 수정하기
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productsService.checkStock({ productId });

    return this.productsService.update({ productId, updateProductInput });
  }

  // 상품 삭제하기
  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productsService.delete({ productId });
  }

  // 상품 복구하기
  @Mutation(() => Boolean)
  restoreProduct(@Args('productId') productId: string) {
    return this.productsService.restore({ productId });
  }
}
