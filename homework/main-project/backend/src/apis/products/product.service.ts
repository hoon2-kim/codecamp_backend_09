import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../productImages/entities/productImage.entity';
import { ProductDiscount } from '../productsDiscount/entities/productDiscount.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) //
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductDiscount) //
    private readonly productsDiscountRepository: Repository<ProductDiscount>,

    @InjectRepository(ProductImage) //
    private readonly productsImageRepository: Repository<ProductImage>,
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
    const { productCategoryId, productDiscount, imgUrls, ...product } =
      createProductInput;

    console.log('img: ', imgUrls);

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

    // 이미지 테이블에 저장
    await Promise.all(
      imgUrls.map(async (el) => {
        await this.productsImageRepository.save({
          product: result2.id,
          imgUrl: el,
        });
      }),
    );
    return result2;
  }

  // 상품 수정하기
  async update({ productId, updateProductInput }) {
    const { imgUrls } = updateProductInput;

    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });

    const result = await this.productsRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    // console.log('qwe123: ', result);

    // 이미지 테이블 삭제 및 새로추가

    await this.productsImageRepository.softDelete({ product: productId });
    await Promise.all(
      imgUrls.map(async (el) => {
        await this.productsImageRepository.save({
          product: result.id,
          imgUrl: el,
        });
      }),
    );

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
