import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 클래스이름 파일이름이랑 이름 같음
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // 소수점 적용
  lat: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lng: number;

  @Column()
  meetingTime: Date;
}
