import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    console.log(files);
    // 파일을 클라우드 스토리지에 저장하는 로직

    const waitedFiles = await Promise.all(files); // 파일을 두 개 이상 보내면 파일 한개는 console.log에 찍히지만 다른 하나는 pending 상태기 때문에 기다려줘야함, 근데 단순히 await만 하면 나머지 하나는 계속 pending 상태다, 그래서 promise.all 해줘야 한다.
    console.log(waitedFiles); // [file, file]

    // 스토리지 세팅하기
    const bucket = 'codecamp-hoon2';
    const storage = new Storage({
      projectId: 'codecamp-backend09',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 세팅된 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        // map이 배열이니 배열 따로 안만들어도됨
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream()) // 파이프로 storage에 업로드
              .on('finish', () => resolve(`${bucket}/${el.filename}`)) // 앞에 구글 주소도 있는데 그건 프론트쪽에서, on은 업로드 되고나서야 실행됨
              .on('error', () => reject('실패'));
          }),
      ),
    );

    // 다운로드URL 브라우저에 돌려주기
    return results;
  }
}

// 1. 저장할 폴더를 만들기
// 2. 저장기능 설치하기
// GCP는 yarn add @google-cloud/storage
// 참고) 버킷은 폴더
