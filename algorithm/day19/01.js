// 최대공약수와 최소공배수

// 문제 설명
// 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요. 배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다. 예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는 [3, 12]를 반환해야 합니다.

// 제한 사항
// 두 수는 1이상 1000000이하의 자연수입니다.
// 입출력 예
// n	m	return
// 3	12	[3, 12]
// 2	5	[1, 10]
// 입출력 예 설명
// 입출력 예 #1
// 위의 설명과 같습니다.

// 입출력 예 #2
// 자연수 2와 5의 최대공약수는 1, 최소공배수는 10이므로 [1, 10]을 리턴해야 합니다.

// -----------------------------------------------------------------------------------------

// 나의 답
function solution(n, m) {
    let answer = [];
    let maxNum = Math.max(n, m);
    let minNum = Math.min(n, m);

    while (minNum !== 0) {
        let num = maxNum % minNum;
        maxNum = minNum;
        minNum = num;
    }

    const least = (n * m) / maxNum;
    answer.push(maxNum, least);
    return answer;
}

function solution2(n, m) {
    let answer = [];
    let min = Number.MIN_SAFE_INTEGER;

    for (let i = 1; i < Math.max(n, m); i++) {
        if (n % i === 0 && m % i === 0) {
            min = Math.max(min, i);
        }
    }

    const least = (n * m) / min;
    answer.push(min, least);
    return answer;
}

// -----------------------------------------------------------------------------------------

// 멘토님
function solution2(n, m) {
    // 최대공약수 : 두 수의 공통되는 약수 중에서 가장 큰 수
    // 최소공배수 : 두 수의 공통되는 배수 중에서 가장 작은 수

    // 최대공약수 구하기
    let max = 0; // 공약수 중에서 가장 큰 수만 저장
    for (let i = 1; i <= m; i++) {
        if (n % i === 0 && m % i === 0) {
            max = i;
        }
    }
    // 최소공배수 구하기
    let min = 0; // 공배수 중에서 가장 작은 수만 저장
    for (let i = m; i <= m * n; i += m) {
        if (i % n === 0) {
            min = i;
            break;
        }
    }
    return [max, min];
}

// 다른풀이
function solution(n, m) {
    // 유클리드 호재법 - 최대공약수를 구하기 위한 알고리즘 (공식)
    // 1. a를 b로 나누었을 때, (a>b, 큰 수를 더 작은 수로 나누었을 때)
    // 2. 나머지 값이 0이 되면, 더 작은수(b)가 최대공약수가 된다.
    // 3 .나머지 값이 0이 되지 않으면, 작은 수(b)가 큰 수(a)가 되고
    // 4 .나머지 값이 작은 수(b)가 된다.
    // 위 과정을 계속 반복한다.

    let a = m; // 큰 수
    let b = n; // 작은 수
    let r = 0; // a를 b로 나눴을 때의 나머지 값 할당

    while (a % b > 0) {
        r = a % b; // 큰 수에 더 작은 수를 다시 할당
        a = b; // 큰 수에 나눴을 때의 더 작은 수를 할당
        b = r; // 작은 수에는 나머지 값을 할당
    }

    // 최소공배수는 두 수를 곱한 수에 최대공약수를 나눠준 몫의 값
    return [b, (n * m) / b];
}
