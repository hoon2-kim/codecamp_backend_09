import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 클래스이름 파일이름이랑 이름 같음
@ObjectType()
export class ProductSaleslocation {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  addressDetail: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 9, scale: 6 }) // 소수점 적용
  lat: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lng: number;

  @Field(() => Date)
  @Column()
  meetingTime: Date;
}
