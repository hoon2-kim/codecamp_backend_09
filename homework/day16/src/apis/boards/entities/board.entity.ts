import { BoardList } from 'src/apis/boardLists/entities/boarList.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isSecret: boolean;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => BoardList)
  boarlist: BoardList;
}
