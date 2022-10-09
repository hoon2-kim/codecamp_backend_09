import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => String) // 다운로드 주소니까
  uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload, // 파일받아옴, ()안은 graphql 타입, 바깥쪽은 타입스크립트 타입
  ) {
    console.log('aaasdasdasdasd');

    return this.filesService.upload({ file });
  }
}

// 파일타입은 graphql에서 제공해주는데 yarn add graphql-upload, yarn add @types/graphql-upload --dev 해줘야 한다
