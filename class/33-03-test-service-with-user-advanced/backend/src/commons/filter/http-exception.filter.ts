import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException) // nest에게 알려줌
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus(); // nest가 생각한 상태코드
    const message = exception.message; // nest가 판단한 메세지

    console.log('=========================');
    console.log('예외가 발생했어요!!');
    console.log('예외내용: ', message);
    console.log('예외코드: ', status);
    console.log('=========================');
  } // 모든 에러는 이쪽으로 옴
}

// implements를 작성하고 catch함수가 없으면 오류남
// 조금 더 안전하게 코딩하게 해주는 가이드
// 상속이랑 다름 내가 만들어야함
