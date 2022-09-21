import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductDiscount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discountPrice: number;
}
