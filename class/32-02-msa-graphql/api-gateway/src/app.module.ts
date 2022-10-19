import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver, // driver에 나는 게이트웨이 할거야 알려줌
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: 'http://auth-service:3001/graphql' },
            {
              name: 'resource',
              url: 'http://resource-service:3002/graphql',
            },
          ],
        }),
      },
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

// 단순히 합치는 용도기때문에 resolver,service 지워도됨
