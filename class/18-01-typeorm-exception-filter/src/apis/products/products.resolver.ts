import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  // DI
  constructor(private readonly productsService: ProductsService) {}

  // 전체조회
  @Query(() => [Product])
  fetchProducts() {
    return this.productsService.findAll(); // 이걸 리턴시키려면 Query안에 타입써줘야함
    // 서비스에서 await 안 써도됨 왜냐면 브라우저에서 나가려면 여기서 알아서 기다림
  }

  // 개별조회
  @Query(() => Product) // 한개니까
  fetchProduct(
    @Args('productId') productId: string, // productId라는 걸로 Args에서 받음
  ) {
    return this.productsService.findOne({ productId }); // 서비스로 넘겨줌
  }

  // 상품 만들기
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create({ createProductInput }); // 입력값 넣으면 service에서 받아서 db에 저장함
  }

  // 상품 수정하기
  @Mutation(() => Product)
  async updateProduct(
    // Args에서 productId로 받아와서 productId 변수에 넣음
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 수정하기 전에 판매 완료가 되었는지 확인해보기
    await this.productsService.checkSoldout({ productId });

    // 수정하기
    return this.productsService.update({ productId, updateProductInput });
  }
}

// 수정,삭제는 고민해보고 만들자(이럴땐 수정되면 안되는데, 삭제되면 안되는데)
