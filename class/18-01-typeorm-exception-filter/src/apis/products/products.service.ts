import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // 어떤 레파지토리? Product
  ) {}

  // 전체조회
  findAll() {
    return this.productsRepository.find(); // 모든 데이터 가지고옴
  } // 추가작업을 해야할 때는 await을 붙여줘야함

  // 개별조회
  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId }, // 조건문,프론트에서 받아오는 아이디
    });
  }

  // 상품 만들기
  create({ createProductInput }) {
    const result = this.productsRepository.save({
      ...createProductInput, // 분리해서 다 가져옴

      // 하나하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });
    return result; // {id: sdgjsdgjp, name: "마우스", description: "좋은 마우스", price: 3000}
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
}

// 에러 : 명확한게 안됨
// 버그 : 실행은 되는데 결과가 엉뚱함
// 예외 : 예상치 못한것들
