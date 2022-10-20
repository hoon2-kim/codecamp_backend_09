import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppCotroller', () => {
  let appController: AppController; // 함수 안에서 정의되니까 꺼내려면 이런식으로
  //
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // imports: [],
      controllers: [AppController],
      providers: [AppService],
    }).compile(); // 의존성 주입

    appController = app.get<AppController>(AppController); // get은 꺼내는거
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
