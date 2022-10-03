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

  // 전체조회
  findAll() {
    return this.userRepository.find();
  }

  // 개별조회
  findOne({ userId }) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  // 생성
  async create({ createUserInput }) {
    const { ...user } = createUserInput;

    // 이메일 검증
    const emailCheck = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (emailCheck) throw new ConflictException('이미 등록된 메일입니다.');

    return this.userRepository.save({ ...user });
  }

  // 수정
  async update({ userId, updateUserInput }) {
    const myuser = await this.userRepository.findOne({
      where: { id: userId },
    });
    console.log(myuser);
    console.log(updateUserInput);

    const result = this.userRepository.save({
      ...myuser,
      id: userId,
      ...updateUserInput,
    });
    return result;
  }

  // 삭제
  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }
}
