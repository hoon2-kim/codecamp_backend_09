import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class IamportService {
  // 토큰 발급 요청
  async getAccessToken() {
    try {
      const getToken = await axios.post(
        'https://api.iamport.kr/users/getToken',
        {
          imp_key: process.env.IMP_KEY,
          imp_secret: process.env.IMP_SECRET,
        },
      );
      return getToken.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  // 결제 정보 조회
  async getPaymentInfo({ impUid, paymentToken, amount }) {
    try {
      const paymentInfo = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: paymentToken },
        },
      );

      // 검증
      if (paymentInfo.data.response.status !== 'paid')
        throw new ConflictException('결제 내역이 존재하지 않습니다.');

      if (paymentInfo.data.response.amount !== amount)
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다.');
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  // 결제 취소
  async cancel({ impUid, paymentToken }) {
    try {
      const cancelInfo = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        {
          imp_uid: impUid,
        },
        {
          headers: { Authorization: paymentToken },
        },
      );
      return cancelInfo.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
