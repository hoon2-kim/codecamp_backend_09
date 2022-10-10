import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid') // 유일한값
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Boolean)
  @Column({ default: false }) // 처음 만들었을 땐 기본이 false임(안팔렷으니까)
  isSoldout: boolean; // 저장될땐 tinyint 형태로 저장됨

  @Field(() => ProductSaleslocation) // 필드에 들어가는건 리턴타입 그래서 ProductSaleslocation 엔티티에 @ObjectType 등록해야함
  @JoinColumn() // 이건 OneToOne 쪽에 있어야함
  @OneToOne(() => ProductSaleslocation) // ()안에는 누구랑 연결할건데 / 1대1관계인데 Product가 앞의 One 뒤의 One은 ProductSaleslocation
  productSaleslocation: ProductSaleslocation; // productSaleslocation과 1:1관계

  // 폴더들에 s 붙이는 이유 그룹화하기위해
  @Field(() => ProductCategory)
  @ManyToOne(() => ProductCategory) // 프로덕트카테고리에 연결할게
  productCategory: ProductCategory;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  // 다대다
  @Field(() => [ProductTag]) // 배열은 감싸줘야함
  @JoinTable() // 어느쪽이든 하나만 있어도 됨
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 이거 붙이면 컬럼으로 안만들어짐
  productTags: ProductTag[]; // []은 여러개

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAT: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
