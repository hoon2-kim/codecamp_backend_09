import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  issuedAt: Date;

  @Column()
  expiredAt: Date;

  @Column({ nullable: false })
  usedAt: Date;

  @Column()
  isUsed: boolean;

  @ManyToOne(() => User)
  user: User;
}
