import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // app.module.ts
  app.useGlobalPipes(new ValidationPipe()); // yarn add class-validator, class-transformer를 가지고 백엔드 전역에서 유효성 검사가 이루어지도록 하는 전역 범위 파이프
  app.useGlobalFilters(new HttpExceptionFilter()); // exception filter
  await app.listen(3000);
}
bootstrap();
