import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductImage } from 'src/apis/productImages/entities/productImage.entity';
import { ProductDiscount } from 'src/apis/productsDiscount/entities/productDiscount.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  deliveryPrice: number;

  @Column()
  @Field(() => Int)
  maxQ: number;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int)
  stock: number;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => ProductDiscount)
  @Field(() => ProductDiscount)
  productDiscount: ProductDiscount;

  @JoinTable()
  @ManyToMany(() => ProductImage, (ProductImages) => ProductImages.products)
  @Field(() => [ProductImage])
  productImages: ProductImage[];

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
