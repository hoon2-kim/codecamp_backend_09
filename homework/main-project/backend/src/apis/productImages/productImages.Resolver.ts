import { Args, Resolver } from '@nestjs/graphql';
import { ProductImagesService } from './productImages.service';

@Resolver()
export class ProductImagesResolver {
  constructor(private readonly productImageService: ProductImagesService) {}

  async imgCreate(
    @Args('producId') producId: string,
    @Args('mainImgUrl') mainImgUrl: string, //
  ) {
    this.productImageService.create({ producId, mainImgUrl });
  }
}
