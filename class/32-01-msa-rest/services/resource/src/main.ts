import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'resource-service', // 어떤 이름으로 할건지
        port: 3002, // 3000으로 하면 포트 충돌
      },
    },
  );
  await app.listen();
}
bootstrap();
