import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'auth-service', // 어떤 이름으로 할건지
        port: 3001, // 3000으로 하면 포트 충돌
      },
    },
  ); // 나는 서비스들이에요

  await app.listen();
}
bootstrap();
