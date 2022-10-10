// rest-api 랑 다르게 graphql 전용 guards만들어줘야함
// rest-api는 @UseGuards(AuthGuard('qqq'))만 하면 끝

import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport'; // yarn add @nestjs/passport passport

export class GqlAuthAccessGuard extends AuthGuard('access') {
  // AuthGuard의 access가 뜻하는건 jwt-access.strategy.ts 가 access로 실행하라는 뜻
  // 오버라이딩 - gql전용 context만듬
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}

export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  // 오버라이딩 - gql전용 context만듬
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}

// class에서 부모클래스를 자식클래스가 상속받았고 부모클래스의 예를들어 attack 함수를 자식클래스가 attack함수를 만들면 자식의 attack 함수를 쓴다 이걸 오버라이딩 이라고 한다.
