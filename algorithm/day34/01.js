const leftNumbers = [1, 4, 7]; // 왼쪽 키패드에 해당하는 숫자를 배치
const rightNumbers = [3, 6, 9]; // 오른쪽 키패드에 해당하는 숫자를 배치

function solution(numbers, hand) {
    let answer = "";

    // 현재 두 엄지손가락이 어떤 위치에 있는지
    const current = {
        left: 10,
        right: 12,
    };

    for (let i = 0; i < numbers.length; i++) {
        if (leftNumbers.includes(numbers[i])) {
            // 누를 번호가 왼쪽 키패드에 해당된다면 ( = 왼쪽 손가락으로 누른다. )
            answer += "L";
            current["left"] = numbers[i]; // 왼쪽 손가락의 위치를 변경
        } else if (rightNumbers.includes(numbers[i])) {
            // 누를 번호가 오른쪽 키패드에 해당된다면 ( = 오른쪽 손가락으로 누른다. )
            answer += "R";
            current["right"] = numbers[i]; // 오른쪽 손가락의 위치를 변경
        } else {
            // 가운데 키패드에 해당할 경우
            const locationObj = { ...current }; // 왼쪽과 오른쪽의 손가락의 위치 거리를 저장

            for (let hand in locationObj) {
                // 0번을 눌렀을 때의 예외 처리 = 0번은 11 위치값으로 처리한다.
                numbers[i] = numbers[i] === 0 ? 11 : numbers[i];
                // 왼쪽과 오른쪽 엄지손가락으로부터 거리값을 구해온다.
                let location = Math.abs(numbers[i] - locationObj[hand]);

                // 거리 차이가 3칸 이상일 때는 위 아래로 이동할 수 있다.
                if (location >= 3) {
                    location = Math.trunc(location / 3) + (location % 3);
                }
                locationObj[hand] = location;
            }

            // 왼쪽 손가락의 위치와 오른쪽 손가락의 위치가 서로 동일할 경우
            // 주로 사용하는 손가락(hand 매개변수)을 이용해서 누른다.
            if (locationObj["left"] === locationObj["right"]) {
                answer += hand === "left" ? "L" : "R";
                current[hand] = numbers[i];
            } else {
                if (locationObj["left"] > locationObj["right"]) {
                    // 오른쪽 손가락이 더 가까운 경우
                    answer += "R";
                    current["right"] = numbers[i];
                } else {
                    // 왼쪽 손가락이 더 가까운 경우
                    answer += "L";
                    current["left"] = numbers[i];
                }
            }
        }
    }
    return answer;
}

// 다른풀이
