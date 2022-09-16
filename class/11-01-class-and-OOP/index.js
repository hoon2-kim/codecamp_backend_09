// class Date {
//     getFullYear() {

//     }

//     getMonth() {

//     }
// }

const aaa = new Date();
console.log(aaa.getFullYear()); // 2022
console.log(aaa.getMonth() + 1); // 9

// 몬스터 만들어보기 , 클래스 안에서는 const,let 이런거 안붙임 / 함수도 function 안붙임
class Monster {
    power = 10;

    // 생성자
    constructor(aaa) {
        this.power = aaa;
    }

    attack = () => {
        console.log("공격하자!!");
        console.log("내 공격력은 " + this.power + "야!!!");
    }; // this는 내 자신

    run = () => {
        console.log("도망가자!!");
    };
}

const mymonster1 = new Monster(20); // 20 입력한 값이 constructor의 aaa로 들어감
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(50);
mymonster2.attack();
mymonster2.run();
