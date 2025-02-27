import { ReceiveEventPaymentUseCase } from '@/application/usecase/payment/receive-event-payment.usecase';
import { BillingRepo } from '@/infra/data/repo/billing.repo';

export const ReceiveEventPaymentUseCaseName = 'ReceiveEventPaymentUseCase';

export const receiveEventPaymentUseCaseFactory = {
  provide: ReceiveEventPaymentUseCaseName,
  inject: [BillingRepo.name],
  useFactory: (billingRepository) => {
    return new ReceiveEventPaymentUseCase(billingRepository);
  },
};
