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
    await new Promise((resolve, reject) => {
        // 파일 읽어오기
        storage
            .file(event.name)
            .createReadStrea() // 4. 기존의 파일을 읽어오기
            .pipe(sharp().resize({ width: 320 })) // 5. event 안에 있는 file을 활용하여 썸네일 생성
            .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 6. 생성된 썸네일을 재업로드
            .on("finish", () => resolve())
            .on("error", () => reject());
    });
};

// 이미지 스토리지 저장 => CF 실행 => 저장 => 실행 - 무한 반복 막는 방법들
// 1. 썸네일 전용 버킷 새로 생성
// 2. 썸네일 체크
