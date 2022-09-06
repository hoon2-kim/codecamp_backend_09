// 커피 목록 조회 API를 요청해주세요.
const getCoffee = async () => {
  console.log("index.js 파일의 openMenu 함수 안에서 getCoffee가 실행 됨");
  // 1. 백엔드 서버로 /starbucks API 요청해 커피 데이터를 받는다.

  const coffee = await axios
    .get("http://localhost:3000/starbucks") //
    .then((res) => {
      // console.log(res);
      // console.log(res.data);
      return res.data;
    });
  // console.log(coffee);

  // 2. 받은 데이터로 createMenuCard 함수를 이용해 메뉴 카드를 모두 만들어주세요.
  // coffee
  //   .then((coffeeLists) => {
  //     for (let list of coffeeLists) {
  //       createMenuCard(list);
  //     }
  //   })
  //   .catch((error) => console.log(error));

  // async await으로 사용
  for (let list of coffee) {
    createMenuCard(list);
  }
};

const createMenuCard = (data) => {
  const menuCardWrapper = document.createElement("div");
  menuCardWrapper.className = "Menu_Card_Wrapper";

  const menuCardImgBox = document.createElement("div");
  menuCardImgBox.className = "Menu_Card_ImgBox";

  const menuCardName = document.createElement("div");
  menuCardName.className = "Menu_Card_Name";
  menuCardName.textContent = data?.name || "메뉴이름";

  const menuCardInfo = document.createElement("div");
  menuCardInfo.className = "Menu_Card_Info";
  menuCardInfo.textContent = data?.kcal || "칼로리";

  const menuWrapper = document.querySelector("#Menu_Background");
  menuCardWrapper.appendChild(menuCardImgBox);
  menuCardWrapper.appendChild(menuCardName);
  menuCardWrapper.appendChild(menuCardInfo);
  menuWrapper.appendChild(menuCardWrapper);
};