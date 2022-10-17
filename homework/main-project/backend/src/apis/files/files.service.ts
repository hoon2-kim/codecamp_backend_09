import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { getToday } from 'src/commons/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

interface IUpload {
  files: FileUpload[];
}

const { STORAGE_BUCKET, STORAGE_KEY_FILENAME, STORAGE_PROJECT_ID } =
  process.env;

@Injectable()
export class FilesService {
  // 업로드
  async upload({ files }: IUpload) {
    // console.log('files: ', files);

    const waitedFiles = await Promise.all(files);
    console.log('waitedFiles: ', waitedFiles);

    // 스토리지 세팅
    const storage = new Storage({
      projectId: STORAGE_PROJECT_ID,
      keyFilename: STORAGE_KEY_FILENAME,
    }).bucket(STORAGE_BUCKET);

    // 세팅된 스토리지에 파일 올리기
    const images = await Promise.all(
      waitedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
            file
              .createReadStream()
              .pipe(storage.file(fname).createWriteStream())
              .on('finish', () => resolve(`${fname}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.log('images: ', images);

    return images;
  }
}
