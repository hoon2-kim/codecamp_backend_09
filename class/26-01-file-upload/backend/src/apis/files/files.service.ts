import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  upload({ file }) {
    console.log(file);
    // 파일을 클라우드 스토리지에 저장하는 로직

    // 스토리지 세팅하기
    const storage = new Storage({
      projectId: 'codecamp-backend09',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-hoon2');

    // 세팅된 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createWriteStream()) // 파이프로 storage에 업로드
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));

    // 다운로드URL 브라우저에 돌려주기
    return file.filename;
  }
}

// 1. 저장할 폴더를 만들기
// 2. 저장기능 설치하기
// GCP는 yarn add @google-cloud/storage
// 참고) 버킷은 폴더
