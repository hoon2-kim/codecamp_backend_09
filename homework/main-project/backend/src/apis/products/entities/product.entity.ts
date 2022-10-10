import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductDiscount } from 'src/apis/productsDiscount/entities/productDiscount.entity';
import {
  Column,
  CreateDateColumn,
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
  @Field(() => Int, { nullable: true })
  deliveryPrice: number;

  @Column()
  @Field(() => Int, { nullable: true })
  maxQ: number;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Column()
  @Field(() => String, { nullable: true })
  contents: string;

  @Column()
  @Field(() => Int, { nullable: true })
  stock: number;

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
