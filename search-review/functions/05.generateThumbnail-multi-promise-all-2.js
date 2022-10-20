const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumbnail = async (event, context) => {
    // 1. event와 context의 데이터를 간단히 로그로 확인하기
    console.log("hello world!!!");
    console.log("==================");
    console.log("context:", context);
    console.log("event", event); // 파일 데이터
    console.log("==================");

    // 2. 이미 썸네일이 있는 경우 종료(즉, 썸네일로 트리거된 경우)
    if (event.name.includes("thumb/")) return;

    // 3. 썸네일 프로세스
    const storage = new Storage().bucket(event.bucket);
    await Promise.all(
        [
            { size: 320, fname: "thumb/s" },
            { size: 640, fname: "thumb/m" },
            { size: 1280, fname: "thumb/l" },
        ].map(
            (el) =>
                new Promise((resolve, reject) => {
                    // 파일 읽어오기
                    storage
                        .file(event.name)
                        .createReadStrea() // 4. 기존의 파일을 읽어오기
                        .pipe(sharp().resize({ width: el.size })) // 5. event 안에 있는 file을 활용하여 썸네일 생성
                        .pipe(
                            storage
                                .file(`${el.fname}/${event.name}`)
                                .createWriteStream()
                        ) // 6. 생성된 썸네일을 재업로드
                        .on("finish", () => resolve())
                        .on("error", () => reject());
                })
        )
    );
};

// 문제점 : 강아지.jpg가 이미 있는데 또 이미지는 다른지만 똑같은 이름으로 올리면 덮어씌기가 된다.
// 해결방법 두가지
// 1) 강아지.jpg / 강아지(1).jpg 이런식으로 되게하기
// 2) uuid를 활용해 .sdgjpsdgj-28sdg-sdgj/강아지.jpg 이런식으로 되게하기
