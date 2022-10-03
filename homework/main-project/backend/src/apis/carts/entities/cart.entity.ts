import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int)
  count: number;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int)
  cartPriceTotal: number;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @JoinColumn()
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
