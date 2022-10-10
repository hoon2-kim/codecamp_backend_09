import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  // 업로드
  async upload({ files }) {
    // console.log('files: ', files);

    const waitedFiles = await Promise.all(files);
    console.log('waitedFiles: ', waitedFiles);

    // 스토리지 세팅
    const bucket = 'codecamp-hoon2';
    const storage = new Storage({
      projectId: 'codecamp-backend09',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 세팅된 스토리지에 파일 올리기
    const images = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.log('images: ', images);

    return images;
  }
}
