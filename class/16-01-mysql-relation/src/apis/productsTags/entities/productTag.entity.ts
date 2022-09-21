import { Product } from 'src/apis/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[]; // 여러개니까 s붙임
}

// 뒤의 (products) => products.productTags의 의미는 products가 날 뭘로 생각하는지
