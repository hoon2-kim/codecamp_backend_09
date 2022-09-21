import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoardList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
}
