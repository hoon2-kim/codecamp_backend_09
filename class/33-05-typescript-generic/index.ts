// 1. 문자/숫자/불린 타입                                                   리턴타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입(그냥 자바스크립트랑 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any는 아무거나 다 됨

  return [arg3, arg2, arg1];
};

const result1 = getAny("철수", 123, true); // 아무 타입이나 가능하지만 리턴 타입 예측못함

//
//
// 3. unknown 타입(다 들어갈수 있지만 확실하게 해줘야함)
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") {
    console.log(arg1 + 100); // unknown은 사용할 때, 타입을 가정하여 사용해야 함
  }

  return [arg3, arg2, arg1];
};

const result2 = getUnknown("철수", 123, true);

//
//
// 4. generic 타입 - 1 / 내가 만든 타입 / <>의미 이거 쓸거야
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result3 = getGeneric("철수", 123, true); // 그래서 예를들면 어느거나 들어갈 수 있는데 "철수"가 들어가면 그제서야 MyType1은 string이구나 한다
// const result = getGeneric<string, number, boolean>("철수", 123, true); // 고정시키고 싶다면

//
//
// 5. generic 타입 - 2 / 축약
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric2<string, number, boolean>("철수", 123, true);

//
//
// 6. generic 타입 - 3 /
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result5 = getGeneric3<string, number, boolean>("철수", 123, true);

//
//
// 6. generic 타입 - 4 /
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};

const result6 = getGeneric4<string, number, boolean>("철수", 123, true);

// 제네릭을 쓸 때
// 1. 라이브러리 개발
// 2. 사내 라이브러리

//
// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// let userRepository: MockRepository(User)
// 해석 T에 User가 들어가고 Repository의 메소드들을 key로 나열하고 Record가 있으니까 jest.Mock(가짜)들을 키에 붙인다, 그리고 모든 메소드 들이
// 있는게 아니라서 앞에 Partial이 있다
