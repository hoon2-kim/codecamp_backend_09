import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './product.service';

@Resolver()
export class ProductsResolver {
  // DI
  constructor(
    private readonly productsService: ProductsService, //
    private readonly elasticsearchService: ElasticsearchService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // 전체조회
  @Query(() => [Product])
  async fetchProducts(
    @Args('search') search: string, //
  ) {
    // 1. 레디스에 캐시되어 있는지 확인하기
    console.time('메모리에 캐시된거 가져오기');
    const productsCache = await this.cacheManager.get(`products:${search}`);
    console.timeEnd('메모리에 캐시된거 가져오기');
    if (productsCache) return productsCache;

    // 2. 레디스에 캐시가 되어있지 않다면, 엘라스틱서치에서 조회하기(유저가 검색한 검색어로 조회하기)
    console.time('디스크에 저장된거 가져오기');
    const result = await this.elasticsearchService.search({
      index: 'myproduct0999',
      query: { match: { name: search } },
    });
    console.timeEnd('디스크에 저장된거 가져오기');
    // console.log(JSON.stringify(result, null, '  '));
    const products = result.hits.hits.map((el: any) => ({
      id: el._source.id,
      name: el._source.name,
      price: el._source.price,
    }));
    // console.log(products);

    // 3. 엘라스틱서치에서 조회 결과가 있다면, 레디스에 검색결과 캐싱해놓기
    await this.cacheManager.set(`products:${search}`, products, { ttl: 0 });

    // 4. 최종 결과 브라우저에 리턴해주기
    return products;
  }

  // 개별조회
  @Query(() => Product) // 한개니까
  async fetchProduct(
    @Args('search') search: string, //
  ) {
    //  1. 레디스에 캐시되어 있는지 확인하기

    // 2. 레디스에 캐시가 되어있지 않다면, 엘라스틱서치에서 조회하기(유저가 검색한 검색어로 조회하기)
    const result = await this.elasticsearchService.search({
      index: 'myproduct0999', // 인덱스는 테이블명
      query: {
        match: { name: search },
      },
    });
    console.log(JSON.stringify(result, null, '  '));

    // 3. 엘라스틱서치에서 조회 결과가 있다면, 레디스에 검색결과 캐싱해놓기

    // 4. 최종 결과 브라우저에 리턴해주기
  }

  // 상품 만들기
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productsService.create({ createProductInput }); // 입력값 넣으면 service에서 받아서 db에 저장함
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

  // 상품 삭제하기
  @Mutation(() => Boolean) // 삭제됐니 안됐니 불린으로 리턴
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }
}

// 수정,삭제는 고민해보고 만들자(이럴땐 수정되면 안되는데, 삭제되면 안되는데)
