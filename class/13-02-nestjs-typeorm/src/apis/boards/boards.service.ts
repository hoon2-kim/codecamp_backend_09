import { Injectable } from '@nestjs/common';

@Injectable() // 서비스는 의존성 주입되는 곳이기 때문
export class BoardsService {
  // 비지니스 로직
  qqq() {
    return 'Hello World!';
  }
}
