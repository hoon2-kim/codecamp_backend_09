import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { ProductsModule } from './apis/products/product.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { FilesModule } from './apis/files/files.module';
import * as redisStore from 'cache-manager-redis-store'; // 수동으로
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    FilesModule,
    PaymentMoudle,
    PointsTransactionsModule,
    AuthModule,
    BoardsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(), // yarn add @nestjs/config // .envs
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', // 이걸 적으면 code-first
      context: ({ req, res }) => ({ req, res }),
    }),

    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // **은 모든폴더
      synchronize: true, // 동기화
      logging: true,
    }),

    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true, // 레디스를 전체에 걸쳐서 쓰고싶다면 이렇게 아니면 file이나 board에만 쓰고 싶다면 false하고 각각 폴더에
    }),
  ],
})
export class AppModule {}
