import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({type:'varchar', length:100, unique: true })
  @Field(() => String)
  categoryName: string;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
