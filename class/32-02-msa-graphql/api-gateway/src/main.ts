import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// 여기서 설치할거 yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express graphql @apollo/gateway

// 서비스쪽에서 설치할거 yarn add @nestjs/graphql @nestjs/apollo apollo-server-express graphql @apollo/federation @apollo/subgraph
