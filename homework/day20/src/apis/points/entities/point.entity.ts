import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Point {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Date)
  issuedAt: Date;

  @Column()
  @Field(() => Date)
  expiredAt: Date;

  @Column({ nullable: true })
  @Field(() => Date)
  usedAt: Date;

  @Column()
  @Field(() => Boolean)
  isUsed: boolean;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
