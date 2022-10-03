import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 데이터를 받을 때 hashedPassword: qqq 라고 하면 밑에서 qqq로 사용가능하다. (매개변수)
  async create({ email, hashedPassword: password, name, age }) {
    // 이미 이메일 있는지 검증
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    //   throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT); // 이렇게도 가능

    return this.userRepository.save({
      //   email: email, // 앞은 엔티티 키워드, 뒤는 받은 데이터
      //   password: password,
      //   name: name,
      //   age: age,
      email,
      password,
      name,
      age,
    }); // 주는쪽
  }
}

// const profile = {
//   name: '철수',
//   age: 12,
//   school: '다람쥐초등학교',
// };

// const { age: qqq } = profile;
// console.log(qqq); // age는 못쓰고 qqq로 쓸 수 있다 (받아오는쪽(매개변수)에서 쓸수있다)
