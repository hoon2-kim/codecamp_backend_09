// 신고 결과 받기

function solution(id_list, report, k) {
    const reporter = {}; // 신고한 사람이 누구를 신고했는지에 대한 정보를 저장
    const users = {}; // 신고당한 사람이 몇번 신고를 당했는지에 대한 정보를 저장

    report = Array.from(new Set(report));
    const answer = [];

    for (let i = 0; i < report.length; i++) {
        const info = report[i].split(" ");

        if (reporter[info[0]] === undefined) {
            reporter[info[0]] = [];
        }

        if (users[info[1]] === undefined) {
            users[info[1]] = 0; // 초기값, 0번 신고당했다
        }

        // 중복 신고를 방지
        // 지금 신고하려는 유저가 이전에 해당 유저를 신고한 내력이 있는지를 검증

        reporter[info[0].push(info[1])];
        users[info[1]]++;
    }

    for (let i = 0; i < id_list.length; i++) {
        const arr = reporter[id_list[i]];
        answer[i] = 0;

        for (let j = 0; j < arr.length; j++) {
            if (users[arr[j]] >= k) {
                answer[i]++;
            }
        }
    }
    return answer;
}

//
function solution(id_list, report, k) {
    const reporter = {}; // 신고한 사람이 누구를 신고했는지에 대한 정보를 저장
    const users = {}; // 신고당한 사람이 몇번 신고를 당했는지에 대한 정보를 저장

    report = Array.from(new Set(report));
    report.forEach((el) => {
        el = el.split(" ");

        if (reporter[el[0]] === undefined) reporter[el[0]] = [];

        if (users[el[1]] === undefined) users[el[1]] = 0;

        reporter[el[0]].push(el[1]);
        users[el[1]]++;
    });

    return id_list.map((name) => {
        const arr = reporter[name] || [];
        return arr.reduce((acc, cur) => {
            return acc + (users[cur] >= k ? 1 : 0);
        }, 0);
    });
}
