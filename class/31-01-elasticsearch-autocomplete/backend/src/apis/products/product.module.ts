import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './entities/product.subscriber';
import { ProductsResolver } from './product.resolver';
import { ProductsService } from './product.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200', // 싱글 노드니까
    }),
  ],
  providers: [
    ProductsResolver, //
    ProductsService, //
    ProductSubscriber,
  ],
})
export class ProductsModule {}
