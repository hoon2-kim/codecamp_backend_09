class Car {
    price = "비싸";

    constructor(model, hp, color) {
        this.model = model;
        this.hp = hp;
        this.color = color;
    }

    start = () => {
        console.log("부릉부릉 출발~~~");
    };

    stop = () => {
        console.log("멈춰!!!!!!");
    };
}

class MyCar extends Car {
    constructor(model, hp, color) {
        super(hp, color);
        this.model = model;
    }

    intro = () => {
        console.log(
            `내 차의 기종은 ${this.model}이고 마력은 ${this.hp}이며 색깔은 ${this.color}이다.`
        );
    };
}
