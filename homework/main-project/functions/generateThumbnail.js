const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

// 첫번째 매개변수를 콘솔로 찍어보면 파일정보들이 나온다
exports.thumbnailTrigger = async (event, context) => {
    console.log(`event: ${JSON.stringify(event)}`);

    // event에서 파일이름 뽑아오기
    const filename = event.name;

    // 일단 이미지 저장되는 내 버킷
    const storage = new Storage().bucket(event.bucket);

    // return new Promise((resolve, reject) => {
    //     storage
    //         .file(filename)
    //         .createReadStream()
    //         .pipe(sharp().resize({ width: 320 }))
    //         .pipe(storage.file(`thumb/s/${filename}`).createWriteStream())
    //         .on("finish", () => resolve("성공"))
    //         .on("error", () => reject("실패"));
    // });

    // map을 돌리기 위해 만든 배열
    const resize = [
        { size: 320, file: "s" },
        { size: 640, file: "m" },
        { size: 1280, file: "l" },
    ];

    // 무한히 생성될 때 콘솔에서 event를 보니까 event.name에 thumb/로 시작하는 이름들이 엄청 많아서 다시 무한으로 생성되려고 할 때
    // 조건문으로 thumb/를 포함한게 있으면 멈추게 했습니다
    if (filename.includes("thumb/")) {
        return;
    }

    // 일단 new Promise안에 로직들 중에 반복문으로 바껴야 할 거는 사이즈와 thumb/폴더명 이라고 생각하여 map을 사용할 것이기 때문에 배열을 만들었고
    // 사이즈와 thumb/폴더명은 같이 바껴야 하기 때문에 객체에 저장하여서 각각 불렀습니다
    return Promise.all(
        resize.map(
            (el) =>
                new Promise((resolve, reject) => {
                    storage
                        .file(filename)
                        .createReadStream() // filename인 이름의 파일들을 읽고
                        .pipe(sharp().resize({ width: el.size })) // 사이즈를 변경해주고
                        .pipe(
                            storage
                                .file(`thumb/${el.file}/${filename}`) // `thumb/${el.file}/${filename}`으로 저장해서 /가 있으니 thumb/${el.file} 경로에 ${filename}으로 다시 업로드한다.
                                .createWriteStream()
                        )
                        .on("finish", () => resolve("성공"))
                        .on("error", () => reject("실패"));
                })
        )
    );
};
