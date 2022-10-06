import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../users/entities/user.entity';
import { OrderPayment } from './entities/orderPayment.entity';
import { OrdersPaymentsResolver } from './ordersPayments.resolver';
import { OrdersPaymentsService } from './ordersPayments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderPayment, //
      User,
    ]),
  ],
  providers: [
    OrdersPaymentsResolver, //
    OrdersPaymentsService,
    IamportService,
  ],
})
export class OrdersPaymentsModule {}
