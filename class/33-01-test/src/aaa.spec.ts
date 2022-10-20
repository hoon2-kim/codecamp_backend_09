// 1. 한개 테스트하기
//     제목         기능
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  // 예상       될거같다
  expect(a + b).toBe(3);
});

// 2. 여러개 묶음으로 테스트하기
// 묶는건 describe
describe('나의 테스트 그룹', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

// 3. 상품구매하기 테스트 예제
describe('상품구매테스트', () => {
  // 공통된거 먼저 실행
  beforeEach(() => {
    // 로그인 로직 작성!!
  });

  it('돈검증하기', () => {
    const result = true; // 돈이 충분하다고 가정
    expect(result).toBe(true);
  });

  it('상품 구매하기', () => {
    const result = true; // 상품을 구매했다고 가정
    expect(result).toBe(true);
  });
});
