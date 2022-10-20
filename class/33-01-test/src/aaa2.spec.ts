import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppCotroller', () => {
  // 수동으로 의존성 주입 만들기
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      // const result = appService.getHello();
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // describe('fetchBoars',()=>{
  //   appController.fetchBoards()
  // })

  // describe('creeateBoard',()=>{
  //   appController.CreateBoard()
  // })
});
