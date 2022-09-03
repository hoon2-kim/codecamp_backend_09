// 04-02 index.js
// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from "apollo-server";
import {
  checkPhone,
  getToken,
  sendTokenToSMS,
} from "../04-02-rest-api-with-express-board/phone.js";

// playground Docs부분 (rest-api에선 api-docs를 직접 만들어야 하는데 graphql은 여기서 만들면 자동으로 만들어짐)
// 이거까지 다 만들고 서버실행해야함
// 리턴타입
// 리턴타입이 string,int,boolean이 아니면 우리가 만들어야함
const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn => 객체 1개를 의미
    fetchBoards: [MyReturn] # => 배열 안에 객체를 의미
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String => 입력 데이터를 낱개로 보냄
    createBoard(createBoardInput: CreateBoardInput!): String # => 입력 데이터를 묶어서 보냄(실무형), 이거 만들때 type이 아니라 input으로 작성
    # 퀴즈
    createTokenOfPhone(myphone: String): String
  }
`;

// API(rest-api에서 get,post방식)
const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. 데이터를 조회하는 로직(DB에 접속해서 데이터 꺼내오기)
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다~~",
          contents: "내용이에요!!",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희입니다~~",
          contents: "영희이에요!!",
        },
        {
          number: 3,
          writer: "훈이",
          title: "훈이입니다~~",
          contents: "훈이이에요!!",
        },
      ];
      // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
      return result;
    },
  },

  Mutation: {
    // req,res 대신에 parent,args,context,info / 안쓰는건 _ 로 바꿔줌, 쓰는거 뒤쪽은 지워도댐(ex: _,args)
    createBoard: (_, args) => {
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      // 추후 DB배우고 작성

      // 3. DB에 저장이 잘 됐으면, 결과를 브라우저에 응답(response) 주기
      return "게시물 등록에 성공하였습니다.";
    },

    // 퀴즈
    createTokenOfPhone: (_, args) => {
      const myphone = args.myphone;

      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkPhone(myphone);
      if (isValid === false) return;

      // 2. 핸드폰 토큰 6자리 만들기
      const mytoken = getToken();

      // 3. 핸드폰번호에 토큰 전송하기
      sendTokenToSMS(myphone, mytoken);
      return "인증완료!!!";
    },
  },
};

// rest-api에서 const app = express()랑 같은거임
const app = new ApolloServer({
  typeDefs, // 객체에서 하나씩만 있다는건 키와밸류가 같다는거
  resolvers, // api만들고 여기다 등록
  cors: true, // 따로 설치 안해도됨
});

// rest-api의 app.listen
app.listen(3000).then(() => {
  console.log("서버프로그램을 켜는데 성공했어요!!");
});

// fetchBoards("철수") - 백엔드에서 요청하는건 parent로 들어가고
// 브라우저에서 요청하는건 args로
// rest-api의 req,res가 context에 감싸져서 들어옴 (context.req)
// info는 그외 정보
