import { BoardList } from 'src/apis/boardLists/entities/boarList.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  contents: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  isSecret: boolean;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => BoardList)
  boarlist: BoardList;
}
