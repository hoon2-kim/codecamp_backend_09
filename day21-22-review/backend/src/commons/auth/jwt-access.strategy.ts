import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // jwt방식으로 복호화 하려고

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
    console.log('payload: ', payload); // 복호화된 정보들{email: a@a.com, sub: dgodfjpgja-wekoke}
    return {
      // 여기서 무슨일이 일어나냐면 req.user = {}가 만들어지고 밑에 쓴 내용이 들어감
      email: payload.email,
      id: payload.sub,
    };
  }
}
