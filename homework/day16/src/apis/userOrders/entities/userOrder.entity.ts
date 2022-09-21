import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { UserAddress } from 'src/apis/usersAddress/entities/userAddress.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryDate: Date;

  @Column()
  deliveryAt: Date;

  @Column()
  orderCount: number;

  @Column()
  orderAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => UserAddress)
  userAdress: UserAddress;

  @ManyToOne(() => Product)
  product: Product;
}
