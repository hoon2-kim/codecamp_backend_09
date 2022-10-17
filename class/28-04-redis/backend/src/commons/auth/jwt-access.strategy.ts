import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // jwt방식으로 복호화 하려고

// PassportStrategy(인가를 처리할 방식, 나만의 인증 방식 이름): 해당 secret키가 맞는지 복호화를 시도해보며, 만료기간 남았는지 확인
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  // 검사하는 부분                          부모
  constructor() {
    // super는 부모의 constructor에 전달해준다
    super({
      // 검사하는 로직
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.authorization; // Bearer asgjspgjspdgjspgj-sgshgoisgosdg-sgjpsdgjp
      //     const accessToken = temp.toLowerCase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 위 주석처리한 함수가 이미 만들어져있음
      secretOrKey: 'myAccessKey', // 비밀번호 입력했던거
      // 그래서 accessToken 이랑 'myAccessKey'랑 맞는지 검증함
    });
  }

  // 성공했을 때
  validate(payload) {
    // 로그아웃 로직
    // 성공한 토큰에 대해서, 로그아웃된 토큰인지 레디스에서 확인하기!! 확인해서 맞으면 오류던져주기

    console.log('payload: ', payload); // 복호화된 정보들{email: a@a.com, sub: dgodfjpgja-wekoke}
    return {
      // 여기서 무슨일이 일어나냐면 context.req.user = {}가 만들어지고 밑에 쓴 내용이 들어감
      email: payload.email,
      id: payload.sub,
    };
  }
}

// REST-API
// 즉 로직이 user.resolver.ts 파일에서 AuthGuard가 걸린 fetchUser API를 실행하면
// 이 파일의 검증 로직대로 user.resolver.ts 파일의 AuthGuard 검증을 실행함
