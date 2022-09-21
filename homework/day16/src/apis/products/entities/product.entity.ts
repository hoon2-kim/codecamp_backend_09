import { ProductImage } from 'src/apis/productImages/entities/productImage.entity';
import { ProductDiscount } from 'src/apis/productsDiscount/entities/productDiscount.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  deliveryPrice: number;

  @Column()
  maxQ: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  detailText: string;

  @Column()
  stock: number;

  @ManyToOne(() => ProductDiscount)
  productDiscount: ProductDiscount;

  @JoinTable()
  @ManyToMany(() => ProductImage, (ProductImages) => ProductImages.products)
  productImages: ProductImage[];
}
