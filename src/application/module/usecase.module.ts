import { Module } from '@nestjs/common';
import {
  doLoginUsecaseFactory,
  DoLoginUseCaseName,
} from '../factory/do-login-usecase.factory';
import {
  getUserUsecaseFactory,
  GetUserUseCaseName,
} from '@/application/factory/get-user-usecase.factory';
import { GatewayModule } from '@/application/module/gateway.module';
import {
  createBillingUseCaseFactory,
  CreateBillingUseCaseName,
} from '@/application/factory/create-billing-usecase.factory';
import {
  receiveEventPaymentUseCaseFactory,
  ReceiveEventPaymentUseCaseName,
} from '@/application/factory/receive-event-payment-use-case.factory';
import {
  createUserUseCaseFactory,
  CreateUserUseCaseName,
} from '@/application/factory/create-user-use-case.factory';
import {
  getPaymentStatusUseCaseFactory,
  GetPaymentStatusUseCaseName,
} from '@/application/factory/get-payment-status-usecase.factory';

@Module({
  imports: [GatewayModule],
  providers: [
    doLoginUsecaseFactory,
    getUserUsecaseFactory,
    createBillingUseCaseFactory,
    receiveEventPaymentUseCaseFactory,
    createUserUseCaseFactory,
    getPaymentStatusUseCaseFactory,
  ],
  exports: [
    DoLoginUseCaseName,
    GetUserUseCaseName,
    CreateBillingUseCaseName,
    ReceiveEventPaymentUseCaseName,
    CreateUserUseCaseName,
    GetPaymentStatusUseCaseName,
  ],
})
export class UsecaseModule {}
