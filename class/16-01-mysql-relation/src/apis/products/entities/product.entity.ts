import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid') // 유일한값
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean; // 저장될땐 tinyint 형태로 저장됨

  @JoinColumn() // 이건 OneToOne 쪽에 있어야함
  @OneToOne(() => ProductSaleslocation) // ()안에는 누구랑 연결할건데 / 1대1관계인데 Product가 앞의 One 뒤의 One은 ProductSaleslocation
  productSaleslocation: ProductSaleslocation; // productSaleslocation과 1:1관계

  // 폴더들네 s 붙이는 이유 그룹화하기위해
  @ManyToOne(() => ProductCategory) // 프로덕트카테고리에 연결할게
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  // 다대다
  @JoinTable() // 어느쪽이든 하나만 있어도 됨
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 이거 붙이면 컬럼으로 안만들어짐
  productTags: ProductTag[]; // []은 여러개
}
