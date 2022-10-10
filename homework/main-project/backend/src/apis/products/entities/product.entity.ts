import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductDiscount } from 'src/apis/productsDiscount/entities/productDiscount.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
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

  // 이미지
  @Column()
  mainImgUrl: string;

  @Column()
  subImgUrl: string;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => ProductDiscount)
  @Field(() => ProductDiscount)
  productDiscount: ProductDiscount;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
