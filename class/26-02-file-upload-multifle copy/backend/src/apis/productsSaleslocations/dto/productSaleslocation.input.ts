import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

// 이미 만든 ProductSaleslocation 엔티티 재사용(id빼고)
@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}

// id를 빼고 나머지를 InputType으로
