import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productsService: ProductService, //

    private readonly elasticsearchService: ElasticsearchService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache, //
  ) {}

  // 전체 조회 + 검색어 조회
  @Query(() => [Product])
  // @Query(() => String)
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string, //
  ) {
    // search:"" 로 검색시 전체 조회 / 그냥 fetchProducts만 적었을 때 전체 조회
    if (search === '' || search === undefined) {
      return await this.productsService.findAll();
    }
    // redis에서 먼저 조회
    const redisSearch = await this.cacheManger.get(search);
    console.log('redis: ', redisSearch);

    // 있다면 레디스에서 줌
    if (redisSearch) {
      return redisSearch;
    }
    // 없다면 엘라스틱에서 검색

    // 검색어에 딱 맞는 단어만 검색
    else {
      const elasticSearch = await this.elasticsearchService.search({
        index: 'productsearch',
        query: {
          bool: {
            must: { match: { name: search } }, //
          },
        },
      });

      // 만약 엘라스틱에도 없다면 [] 빈배열 반환 , 처음에 오류를 보내줄까 생각했지만 검색결과가 없다는 것이 오류는 아니라고 생각해서 일단 놔뒀습니다.

      // 검색어를 포함한 검색
      // const elasticSearch = await this.elasticsearchService.search({
      //   index: 'productsearch',
      //   query: {
      //     bool: {
      //       must: [
      //         {
      //           prefix: {
      //             name: search,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // });
      console.log(JSON.stringify(elasticSearch, null, '  '));

      const result = elasticSearch.hits.hits.map((el) => {
        return el._source;
      });

      console.log('ela: ', result);

      // 레디스에 저장
      await this.cacheManger.set(search, result, {
        ttl: 0,
      });

      // return '조회완료';
      return result;
      // return this.productsService.findAll();
    }
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
