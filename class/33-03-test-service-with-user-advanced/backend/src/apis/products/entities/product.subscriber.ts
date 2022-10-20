import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery'; // yarn add @google-cloud/bigquery

// implements는 구현하라는거 즉, EntitySubscriberInterface를 구현해라
@EventSubscriber() // 나는 subscriber야
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this); // this는 자기 자신(ProductSubscriber)
  }

  listenTo() {
    return Product; // 구독하고자 하는 엔티티를 반환
  }

  // 해당 테이블에 데이터가 추가된 후 실행되는 메소드
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log(event); // event.entity.price , event.entity.isSoldout, ...

    // << 로그를 저장하는 방법 3가지 >>
    // 1. 여기서 발생한 로그를, 서버 컴퓨터에 저장하기 => 시간별, 일자별 로그 로테이션
    // 2. DB에 로그테이블 만들고 저장하기
    // 3. 외부 빅데이터(BigQuery) 관련 DB에 로그테이블 만들고 저장하기 - 추천!!
    const bigQuery = new BigQuery({
      projectId: 'codecamp-backend09',
      keyFilename: 'gcp-bigquery.json',
    });

    // 내 빅쿼리 dataset이름,table이름
    bigQuery
      .dataset('mybigquery09')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);

    // ================================
    // 트리거는 언제 사용하면 안될까?
    // 트랜잭션 연결된 중요한 내용들 ..

    // 어떤 것들을 사용하면 좋을까?
    // 메인 로직에 큰 피해를 안까치는 로직들 ...(통계 계산하기, 로그 쌓아놓기)
  }
}
