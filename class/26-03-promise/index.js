// .then()으로 받기
const onClickPromiseThen = () => {
    // new Promise는 Promise만들기
    new Promise((resolve, reject) => {
        // 시간이 걸리는 작업(API 보내기 등)
        // ...
        // ...
        // ...
        setTimeout(() => {
            const result = "철수"; // 2초가 걸려서 백엔드에서 '철수' 데이터 받아옴
            // resolve(result); // 성공하면 이거 실행, then으로 감
            reject("에러가 발생했어요!"); // 실패하면 이거 실행 => try - catch에서 실패시 사용하기
        }, 2000);
    })
        .then((res) => {
            console.log(res); // '철수'
        })
        .catch((err) => {
            console.log(err); // '에러가 발생했어요!'
        });
};
// onClickPromiseThen();

// await로 받기
const onClickPromiseAwait = async () => {
    const qqq = await new Promise((resolve, reject) => {
        // 시간이 걸리는 작업(API 보내기 등)
        // ...
        // ...
        // ...
        setTimeout(() => {
            const result = "철수"; // 2초가 걸려서 백엔드에서 '철수' 데이터 받아옴
            resolve(result); // 성공하면 이거 실행, 그리고 이 결과가 qqq로 저장됨
            // reject("에러가 발생했어요!"); // 실패하면 이거 실행 => try - catch에서 실패시 사용하기
        }, 2000);
    });
    console.log(qqq); // 철수
};
onClickPromiseAwait();
