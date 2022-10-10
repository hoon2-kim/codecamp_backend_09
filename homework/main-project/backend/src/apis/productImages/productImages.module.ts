import { Module } from '@nestjs/common';
import { ProductImagesResolver } from './productImages.Resolver';
import { ProductImagesService } from './productImages.service';

@Module({
  providers: [
    ProductImagesResolver, //
    ProductImagesService,
  ],
})
export class ProductImagesModule {}
