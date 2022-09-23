import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductImage } from 'src/apis/productImages/entities/productImage.entity';
import { ProductDiscount } from 'src/apis/productsDiscount/entities/productDiscount.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
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

  // @Column({ type: 'timestamp', nullable: true })
  // @Field(() => Date, { nullable: true })
  // createdAt: Date;

  // @Column({ type: 'timestamp', nullable: true })
  // @Field(() => Date, { nullable: true })
  // updatedAt: Date;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int)
  stock: number;

  @ManyToOne(() => ProductDiscount)
  @Field(() => ProductDiscount)
  productDiscount: ProductDiscount;

  @JoinTable()
  @ManyToMany(() => ProductImage, (ProductImages) => ProductImages.products)
  @Field(() => [ProductImage])
  productImages: ProductImage[];
}
