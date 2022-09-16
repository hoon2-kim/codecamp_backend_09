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
} // 공통부분은 놔두고

// Monster의 기능을 상속받음
class 공중몬스터 extends Monster {
    constructor(qqq) {
        super(qqq);
    }
    run = () => {
        console.log("날라서 도망가자!!");
    };
}

class 지상몬스터 extends Monster {
    run = () => {
        console.log("뛰어서 도망가자!!");
    };
}

const mymonster1 = new 공중몬스터(100); // mymonster1을 인스턴스라고도 부름
mymonster1.attack();
mymonster1.run();

const mymonster2 = new 지상몬스터(); // 초기값을 안주면 undefined가 나옴
mymonster2.attack(); // 내 공격력은 undefined야!!!
mymonster2.run();

// 상속받은 클래스도 클래스 이므로 constructor를 쓸 수 있다
// constructor(qqq) {
//     super(qqq) // super하면 부모꺼로감
// }
