// // public, private, protected, readonly

// // 1. public
// class Aaa1 {
//     constructor(public mypower) {
//         this.mypower = mypower; // public, private, protected, readonly 등 1개라도 있으면 자동 생성됨
//     }
//     ggg() {
//         console.log(this.mypower); // 안에서 접근 가능
//         this.mypower = 10; // 안에서 수정 가능
//     }
// }

// class Aaa2 extends Aaa1 {
//     ggg() {
//         console.log(this.mypower); // 자식이 접근 가능
//         this.mypower = 10; // 자식이 수정 가능
//     }
// }

// const aaaa = new Aaa2(50);
// console.log(aaaa.mypower); // 밖에서 접근 가능
// aaaa.mypower = 10; // 밖에서 수정 가능
