import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') // 이름은 module에 있는 이름과 똑같이
    private readonly clientAuthService: ClientProxy, //
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/auth/login')
  login() {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: '로그인실행해줘' }, // qqq는 단지 실습용, 보통은 {cmd: 'login'} 작성
      { email: 'a@a.com', password: '1234' },
    ); // 이 메시지랑 같은걸 찾으러 감, 뒤의 데이터는 함수로 받음
  }

  @Get('/boards')
  fetchBoards() {
    // resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}

// 이쪽으로만 연결하고 여길 통해서 auth,resource 연결함
