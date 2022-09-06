// 로봇이 계단 100층을 올라간다 할 때(최소 1칸, 최대 2칸씩) 최소 걸음 수

// 하드코딩
let answer = 0; // 이동 횟수
let current = 1; // 로봇의 현재 위치

answer = answer + 1;
current = current + 2;
// ... (49번 반복)

answer = answer + 1;
current = current + 1;

// for 반복문 사용
let answer1 = 0; // 이동 횟수
const limit = 100; // 이동할 층

for (let i = 1; i < limit; i = i + 2) {
  answer1 = answer1 + 1;
}

// Math 메소드 사용
const limit1 = 100; // 이동할 층

const answer2 = Math.floor(limit / 2);
