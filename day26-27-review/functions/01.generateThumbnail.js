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

    // 2. 썸네일 프로세스
    const storage = new Storage().bucket(event.bucket);
    await new Promise((resolve, reject) => {
        // 파일 읽어오기
        storage
            .file(event.name)
            .createReadStrea() // 3. 기존의 파일을 읽어오기
            .pipe(sharp().resize({ width: 320 })) // 4. event 안에 있는 file을 활용하여 썸네일 생성
            .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 5. 생성된 썸네일을 재업로드
            .on("finish", () => resolve())
            .on("error", () => reject());
    });
};

// sharp랑 @google-cloud/storage 버전 cloud-function에서도 여기랑 똑같이 맞춰주기
