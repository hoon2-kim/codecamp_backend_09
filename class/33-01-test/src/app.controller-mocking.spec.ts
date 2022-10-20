import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello(): string {
    return '나는 가짜다!!!';
  }
} // 가짜 만드는거니까 app.service.ts 똑같이 만들어(구분은 되게) / 그래서 app.service.ts에서 constructor의 AppService 대신 MockAppService 쓸거임
// 가짜를 쓰는 이유는 service의 데이터베이스 때문

describe('AppController', () => {
  let appController: AppController; // 함수 안에서 정의되니까 꺼내려면 이런식으로
  //
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // imports: [],
      controllers: [AppController],
      providers: [
        // AppService
        {
          provide: AppService, // 이름
          useClass: MockAppService, // 사용할 클래스
        },
      ], // mocking - 가짜 AppService 주입
    }).compile(); // 의존성 주입

    appController = app.get<AppController>(AppController); // get은 꺼내는거
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
