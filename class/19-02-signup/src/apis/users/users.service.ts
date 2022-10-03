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

  async create({ email, password, name, age }) {
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
    });
  }
}
