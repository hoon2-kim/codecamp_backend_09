// 여기어때/야놀자 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 사람인/잡코리아 위법 사례: https://brunch.co.kr/@lawmission/113

import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false }); // 실행
  const page = await browser.newPage(); // 새로운 페이지
  await page.setViewport({ width: 1280, height: 720 }); // 브라우저 크기 조절
  await page.goto("https://www.goodchoice.kr/product/search/2/2021"); // 주소 이동(주소 쓰고 엔터쳤다)
  await page.waitForTimeout(1000); // 기다림

  const stage = await page.$eval(
    // 페이지에서 얘를 뽑아냄, $$eval은 두개이상 , 뽑아낸 값은 ,하고 함수로
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    (el) => el.textContent // 뽑아낸 데이터가 여기로 오고 textContent만 뽑아옴
  );

  const location = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
    (el) => el.textContent
  );

  const price = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    (el) => el.textContent
  );

  console.log(stage);
  console.log(location.trim());
  console.log(price);

  await browser.close();
}

startCrawling();
