import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './product.service';

@Resolver()
export class ProductsResolver {
  // DI
  constructor(
    private readonly productsService: ProductsService, //

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  // 전체조회
  // @Query(() => [Product])
  @Query(() => String)
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string,
  ) {
    // 엘라스틱서치에서 조회하기 연습!!
    const result = await this.elasticsearchService.search({
      index: 'myproduct0999', // 컬렉션명
      query: {
        match: {
          description: search, // 일반적인 nGram 검색 방법
        },
        //  wildcard: { description: `*${search}*` }, // nGram없이 검색 가능하지만, 성능이 느림
      },
    });

    console.log(JSON.stringify(result, null, '  '));
    return '엘라스틱서치에서 조회 완료!!';

    // 엘라스틱서치에서 조회해보기 위해 임시로 주석!!
    // return this.productsService.findAll(); // 이걸 리턴시키려면 Query안에 타입써줘야함
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
  // @Mutation(() => String)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // // 엘라스틱서치에 등록하기 연습!!
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct09', // 컬렉션이 없어도 NoSQL은 상관없음 알아서 만들어짐
    //   document: {
    //     name: '철수',
    //     age: 13,
    //     schoole: '다람쥐초등학교',
    //     ...createProductInput,
    //   },
    // });
    // return '엘라스틱서치에 등록 완료!!';

    // 엘라스틱서치에 등록 해보기 위해 임시로 주석!!
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

// 앨라스틱 설치할거
// yarn add @nestjs/elasticsearch , yarn add @elastic/elasticsearch
