import { InputType, OmitType } from '@nestjs/graphql';
import { ProductDiscount } from '../entities/productDiscount.entity';

@InputType()
export class ProductDiscountInput extends OmitType(
  ProductDiscount,
  ['id'],
  InputType,
) {}
