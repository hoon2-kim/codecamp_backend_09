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
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  cartPriceTotal: number;

  @ManyToOne(() => Product)
  product: Product;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
