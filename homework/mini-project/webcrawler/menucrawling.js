import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { List } from "./models/coffee.model.js";

// DB 접속
mongoose.connect("mongodb://localhost:27017/miniDB");

// 스타벅스 메뉴 크롤링
export async function starbucksCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  for (let i = 1; i <= 34; i++) {
    // const list = {};
    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );
    const img = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img
    `,
      (el) => el.src
    );
    // console.log(list);

    // DB저장
    const starList = new List({
      name: name,
      img: img,
    });
    await starList.save();
  }
  await browser.close();
}

starbucksCrawling();
