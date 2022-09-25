import { Field, ObjectType } from '@nestjs/graphql';
import { BoardList } from 'src/apis/boardLists/entities/boarList.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  contents: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({type: 'boolean'})
  @Field(() => Boolean)
  isSecret: boolean;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => BoardList)
  @Field(() => BoardList)
  boarlist: BoardList;
}
