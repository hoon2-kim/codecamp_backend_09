import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

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

  // 상품 만들기
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create({ createProductInput });
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
}
