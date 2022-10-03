import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  // DI 주입받기
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // 어떤 레파지토리? Product

    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  // 전체조회
  findAll() {
    return this.productsRepository.find({
      relations: ['productSaleslocation'], // product엔티티에서 연결한 이름이랑 똑같아야함
    }); // 모든 데이터 가지고옴
  } // 추가작업을 해야할 때는 await을 붙여줘야함

  // 개별조회
  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId }, // 조건문,프론트에서 받아오는 아이디
      relations: ['productSaleslocation'],
    });
  }

  // 상품 만들기
  // 1:1관계는 하나의 테이블에 데이터가 생성되면 관계있는 다른 테이블에도 데이터가 생성되어야함(Join)
  async create({ createProductInput }) {
    // // 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   ...createProductInput, // 분리해서 다 가져옴

    //   // 하나하나 직접 나열하는 방식
    //   //   name: '마우스',
    //   //   description: '좋은 마우스',
    //   //   price: 3000,
    // });

    const { prodcutSaleslocation, ...product } = createProductInput; // productSaleslocation 하나는 따로 빠지고 나머지는 product에 담김

    // 1. 상품판매위치 먼저 등록
    const result = await this.productsSaleslocationRepository.save({
      ...prodcutSaleslocation,
      // 하나하나 직접 나열하는 방식
      // address: prodcutSaleslocation.address,
      // addressDetail: prodcutSaleslocation.addressDetail,
      // lat: prodcutSaleslocation.lat,
      // lng: prodcutSaleslocation.lng,
      // meetingTime: prodcutSaleslocation.meetingTime
    });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const result2 = await this.productsRepository.save({
      ...product,
      // 하나하나 직접 나열하는 방식
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // id는 자동생성이니 안넣어도 되고 isSoldout도 디폴트가 false니까 안넣어도됨
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기(ex){id:result.id} 이 방법은 프론트에서 등록결과를 saleslocation까지 모두 받을 수 없음)

      // prodcutSaleslocation: {
      //   id: result.id,
      //   address: result.address,
      //   addressDetail: result.addressDetail
      //   // 등록은 id만 필요하지만 나머지는 return 때문에 필요함
      // },
    });

    // 3. 최종결과 돌려주기
    return result2; // {id: sdgjsdgjp, name: "마우스", description: "좋은 마우스", price: 3000}
  }

  // 상품 수정하기
  async update({ productId, updateProductInput }) {
    // this.productsRepository.update() // 결과는 못받는 수정 방법
    // this.productsRepository.insert() // 결과는 못받는 등록 방법
    // this.productsRepository.create() // 등록을 위한 빈 객체 만들기

    // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    }); // 문제점 해결을 위한 방법중 한가지(프론트랑 협의)

    const result = this.productsRepository.save({
      ...myproduct, // 이걸 먼저 spread 해야 밑에서 수정한 키가 있으면 덮어씌움
      id: productId,
      ...updateProductInput, // 문제점이 있는데 description만 수정하면 이 spread에는 description만 있어서 name,price는 없다 그래서 playground에서 수정하고 name,price도 받을려고하면 없어서 오류남

      // name: '키보드',
      // description: '좋은 키보드',
      // price: 2000,
    }); // save지만 id가 있으면 수정하기로 바뀜
    return result;
  }

  // 판매 완료 확인하기
  async checkSoldout({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    // 팔렸다면
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  // 상품 삭제하기
  async delete({ productId }) {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId }); // 삭제할때까지 오래걸려서 기다림
    // return result.affected ? true : false;
    // affected는 영향받은게 있니?
    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });
    // update안에 앞이 조건 뒤가 수정내용
    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({id:productId,deletedAt: new Date()})
    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 다른 컬럼으로도 삭제 가능
    return result.affected ? true : false;
  }
}

// 에러 : 명확한게 안됨
// 버그 : 실행은 되는데 결과가 엉뚱함
// 예외 : 예상치 못한것들
