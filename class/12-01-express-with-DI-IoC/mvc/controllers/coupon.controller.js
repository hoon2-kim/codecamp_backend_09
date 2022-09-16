export class CouponController {
    cashService;
    // pointService가 들어오면 이름이 cashService여도 상관없음 매개변수니까
    constructor(cashService) {
        this.cashService = cashService;
    }

    buyCoupon = (req, res) => {
        // 1. 가진 돈 검증하는 코드 (대략 10줄 => 2줄 => 1줄)

        const hasMoney = this.cashService.checkValue();

        // 2. 쿠폰 구매하는 코드
        if (hasMoney) {
            res.send("쿠폰 구매완료!!");
        }
    };
}
