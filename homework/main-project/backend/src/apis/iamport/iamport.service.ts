import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class IamportService {
  // 토큰 발급 요청
  async getAccessToken() {
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API키
        imp_secret: process.env.IMP_SECRET, // REST API Secret
      },
    });
    return getToken.data.response.access_token;
  }

  // 결제 정보 조회
  async getPaymentInfo({ impUid, paymentToken }) {
    try {
      const paymentInfo = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
        method: 'get', // GET method
        headers: { Authorization: paymentToken }, // 인증 토큰 Authorization header에 추가
      });

      const payInfo = paymentInfo.data.response;
      return payInfo;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  // 결제 취소
  async cancel({ impUid, paymentToken }) {
    try {
      await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: paymentToken, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          // reason, // 가맹점 클라이언트로부터 받은 환불사유
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
          // amount, // 가맹점 클라이언트로부터 받은 환불금액
          // checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
        },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
