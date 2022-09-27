import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Product])
  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[]; // 여러개니까 s붙임
}

// 뒤의 (products) => products.productTags의 의미는 products가 날 뭘로 생각하는지
