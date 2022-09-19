import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 테이블로 만들어줘
export class Board {
  @PrimaryGeneratedColumn('increment') // mysql은 increment랑 uuid만 보면됨
  number: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}
