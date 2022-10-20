import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// 가짜 DB 만들기(나만의 미니 TypeORM 만들기)
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email); // 알고리즘
    console.log('users: ', users);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>; // repository 타입

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrModule...], // TypeOrmModule도 똑같이 쓰면 실제 DB에 저장되니까 안됨
      // controllers: [], // Resolver는 필요없음
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // 실제 주입되는거 자리에
          useClass: MockUsersRepository, // 이걸 쓸거야
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService); // UsersService 꺼내오기
    usersRepository = usersModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  //   describe('findOne', () => {
  //       const result = usersService.findOne({"이메일"})
  //       expect(result).toBe('결과')
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne'); // usersRepository에 findOne에 스파이 붙임
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');

      // 샘플코드 작성
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException); // 에러가 나와야 정상적으로 이메일 중복 체크
      }

      expect(usersRepositorySpyFindOne).toBeCalledTimes(1); // 이메일 찾으니까 어쨋든 한번은 일어남
      expect(usersRepositorySpySave).toBeCalledTimes(0); // 중복 메일 일부러 했으니 오류나서 0번 일어나야함
    });

    it('회원 등록 잘 됐는지 검증!!', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne'); // usersRepository에 findOne에 스파이 붙임
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');

      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      // toBe는 같니를 물어보는건데 객체는 주소가 다르기 때문에 다른거 써야함
      expect(result).toStrictEqual({
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      });

      expect(usersRepositorySpyFindOne).toBeCalledTimes(1); // 이메일 찾으니까 어쨋든 한번은 일어남
      expect(usersRepositorySpySave).toBeCalledTimes(1); // 여긴 저장하니까 한번 일어남
    });

    // TDD => 테스트를 먼저 만들자!
    // it('이메일 길이가 초과했을때 검증!!!', ()=> {
    //     const myData = {
    //         email: "sfjdspfjppj@jdspogjdp.com"
    //     }

    //     try {
    //         usersService.create({...myData})
    //     } catch(error) {
    //         expect(error)..toBeInstanceOf()
    //     }
    // })
  });
});

// 그래서 테스트할거의 경우의 수가 많은데 실무에서는
// 1. 가장 기본만 테스트
// 2. 에러 발생시, 버그 발생시 => 재발하지 않게끔 테스트코드 추가

// 레이어드 아키텍쳐
// 리졸버에서 서비스로가고 서비스에서 레포지토리로 간다
