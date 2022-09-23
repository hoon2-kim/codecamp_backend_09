import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) //
    private readonly productsRepository: Repository<Product>,
  ) {}

  // 전체조회
  findAll() {
    return this.productsRepository.find();
  }

  // 개별조회
  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
    });
  }

  // 상품 만들기
  create({ createProductInput }) {
    const result = this.productsRepository.save({
      ...createProductInput,
    });
    return result;
  }

  // 상품 수정하기
  async update({ productId, updateProductInput }) {
    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });

    const result = this.productsRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  // 임시로 만듬(고민 해봐야함)
  async checkStock({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (product.stock === 0)
      throw new UnprocessableEntityException('재고가 없습니다.');
  }
}
