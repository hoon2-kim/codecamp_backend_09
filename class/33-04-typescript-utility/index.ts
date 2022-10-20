interface IProfile {
    name: string;
    age: string;
    school: string;
    hobby?: string;
}

// 1. Partial 타입 - 전부다 물음표
type aaa = Partial<IProfile>;

// 2. Required 타입 - 전부다 필수
type bbb = Required<IProfile>;

// 3. Pick 타입 - 뽑아오기
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입 - 빼기
type ddd = Omit<IProfile, "school">;

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; // Union 타입(또는)
let child: eee; // child는 이제 string인데 철수,영희,훈이 중에서만 가능
child = "철수";

type fff = Record<eee, IProfile>; // eee는 key가 되고 IProfile이 값이 된다

let mykey: keyof IProfile; // IProfile의 key들을 뽑는다(keyof)

// ========== ( type vs interface ) 차이: 선언병합 ==========

interface IProfile {
    candy: number;
} // 똑같은 이름으로 된 걸 하나로 합침

let profile: Partial<IProfile> = {
    candy: 10, // 선언병합으로 추가됨
};
