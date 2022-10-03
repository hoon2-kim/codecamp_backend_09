import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesResolver } from './productsCategories.resolver';
import { ProductsCategoriesService } from './productsCategory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]), // typeorm 관련된 것들 적어야함
  ],
  providers: [
    ProductsCategoriesResolver, //
    ProductsCategoriesService,
  ],
})
export class ProductsCategoriesModule {}
