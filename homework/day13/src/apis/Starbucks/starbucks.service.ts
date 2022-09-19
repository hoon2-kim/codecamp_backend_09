import { Injectable } from '@nestjs/common';

@Injectable() // 의존성 주입
export class StarbucksService {
  // 메뉴 조회
  findMenus() {
    const lists = [
      {
        menu: '더블 에스프레소 칩 프라푸치노',
        price: 6300,
        kcal: 265,
        saturated_fat: 11,
        protein: 4,
        salt: 140,
        sugar: 31,
        caffeine: 130,
      },
      {
        menu: '자바 칩 프라푸치노',
        price: 6300,
        kcal: 340,
        saturated_fat: 9,
        protein: 6,
        salt: 180,
        sugar: 42,
        caffeine: 100,
      },
      {
        menu: '제주 까망 크림 프라푸치노',
        price: 7500,
        kcal: 600,
        saturated_fat: 7,
        protein: 9,
        salt: 330,
        sugar: 79,
        caffeine: 0,
      },
      {
        menu: '제주 유기농 말차로 만든 크림 프라푸치노',
        price: 6300,
        kcal: 230,
        saturated_fat: 7,
        protein: 5,
        salt: 150,
        sugar: 28,
        caffeine: 60,
      },
      {
        menu: '화이트 타이거 프라푸치노',
        price: 6500,
        kcal: 410,
        saturated_fat: 14,
        protein: 5,
        salt: 220,
        sugar: 57,
        caffeine: 0,
      },
    ];

    return lists;
  }

  // 메뉴 등록
  createMenu({ createStarbucksInput }) {
    console.log({ createStarbucksInput });

    return '등록에 성공하였습니다.';
  }
}
