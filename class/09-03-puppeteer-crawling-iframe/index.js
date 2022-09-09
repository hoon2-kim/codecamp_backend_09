// 여기어때/야놀자 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 사람인/잡코리아 위법 사례: https://brunch.co.kr/@lawmission/113

import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false }); // 실행
  const page = await browser.newPage(); // 새로운 페이지
  await page.setViewport({ width: 1280, height: 720 }); // 브라우저 크기 조절
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930"); // 주소 이동(주소 쓰고 엔터쳤다), request 요청
  await page.waitForTimeout(1000); // 페이지 이동 기다림
  const framePage = await page
    .frames()
    .find((el) => el.url().includes("/item/sise_day.naver?code=005930")); // iframe만 뽑아오는데 그 중에 일별시세의 날짜가 있는 iframe 찾아
  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );

    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );

    console.log(`날짜: ${date}, 가격: ${price}`);
  }

  await browser.close();
}

startCrawling();
