import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt'; // jwt방식으로 복호화 하려고

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
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
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken = ajgjgosjdgsdjosdjgsjo
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      }, // 이건 함수 직접 만들어야함
      secretOrKey: 'myRefreshKey', // 비밀번호 입력했던거
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
