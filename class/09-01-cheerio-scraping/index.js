import axios from "axios";
import cherrio from "cheerio"; // yarn add cheerio

// 스크래핑 해오는 함수
// async function aaa() {
//   // axios.get으로 요청해서 html 코드 받아오기 => 스크래핑
//   const result = await axios.get("https://www.naver.com");
//   // console.log(result.data);
// }

// aaa();

// 실습 - 주소창에 주소를 쳤다
async function createMessage() {
    // 입력된 메시지: "안녕하세요~ https://www.naver.com에 방문해 주세요!"

    // 1. 입력된 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기!(.find()등의 알고리즘 사용하기)
    const url = "https://www.naver.com";

    // 2. axios.get으로 요청해서 html 코드 받아오기 => 스크래핑
    const result = await axios.get(url);
    // console.log(result.data);

    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
    const $ = cherrio.load(result.data);
    $("meta").each((i, el) => {
        if ($(el).attr("property")?.includes("og:")) {
            const key = $(el).attr("property"); // og:title, og:description 이런애들이 나올텐데 key에 넣어줘
            const value = $(el).attr("content");
            console.log(key, value);
        }
    });
}
// if문 조건 앞에 $(el).attr("property")를 넣어준 이유는 어트리뷰트가 property가 없으면 undefined가 나오는데 undefined.includes하면 오류나기때문이다
// 그리고 $(el).attr("property") && $(el).attr("property").includes("og:") 를 줄이면 ?를 붙여주면된다 이걸 옵셔널 체이닝이라고 하고 의미는 있으면 뒤에 includes를 해주고 없으면 안한다
createMessage();
