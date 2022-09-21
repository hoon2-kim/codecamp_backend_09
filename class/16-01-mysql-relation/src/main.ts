import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // app.module.ts
  await app.listen(3000);
}
bootstrap();
