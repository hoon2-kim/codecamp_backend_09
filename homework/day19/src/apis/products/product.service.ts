import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDiscount } from '../productsDiscount/entities/productDiscount.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) //
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductDiscount) //
    private readonly productsDiscountRepository: Repository<ProductDiscount>,
  ) {}

  // 전체조회
  findAll() {
    return this.productsRepository.find({
      relations: ['productCategory', 'productDiscount'],
    });
  }

  // 개별조회
  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productCategory', 'productDiscount'],
    });
  }

  // 삭제까지 조회
  async fetchDelete() {
    return await this.productsRepository.find({
      withDeleted: true,
      relations: ['productCategory', 'productDiscount'],
    });
  }

  // 상품 만들기
  async create({ createProductInput }) {
    const { productCategoryId, productDiscount, ...product } =
      createProductInput;

    const result = await this.productsDiscountRepository.save({
      ...productDiscount,
    });

    const result2 = await this.productsRepository.save({
      ...product,
      productDiscount: result,
      productCategory: {
        id: productCategoryId,
      },
    });
    return result2;
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

  // 상품 삭제하기
  async delete({ productId }) {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  // 복원
  async restore({ productId }) {
    const result = await this.productsRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
