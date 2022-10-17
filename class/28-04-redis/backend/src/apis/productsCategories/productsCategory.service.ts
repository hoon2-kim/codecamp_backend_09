import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductsCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoriesRepository: Repository<ProductCategory>, // ProductCategory의 Repository다
  ) {}

  create({ name }) {
    // DB에 카테고리 등록
    const result = this.productCategoriesRepository.save({
      name,
    });
    console.log(result); // {id: qweowekpskg-231249sdgmsdgm, name : 가전제품}
    return result;
  }
}
