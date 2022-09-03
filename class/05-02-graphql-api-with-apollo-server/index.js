// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from "apollo-server";

// playground Docs부분 (rest-api에선 api-docs를 직접 만들어야 하는데 graphql은 여기서 만들면 자동으로 만들어짐)
const typeDefs = gql`
  type Query {
    fetchBoards: String
  }
`;

// API(rest-api에서 get,post방식)
const resolvers = {
  Query: {
    fetchBoards: () => {
      return "첫 연습!!!"; // 중괄호 안에 간단한 return만 있으면 중괄호 리턴 지우고 "world" 만 쓰기 가능
    },
  },
  // Mutation: {
  //   createQqq: () => {

  //   }
  // },
};

// rest-api에서 const app = express()랑 같은거임
const app = new ApolloServer({
  typeDefs, // 객체에서 하나씩만 있다는건 키와밸류가 같다는거
  resolvers, // api만들고 여기다 등록
});

// rest-api의 app.listen
app.listen(3000).then(() => {
  console.log("서버프로그램을 켜는데 성공했어요!!");
});
