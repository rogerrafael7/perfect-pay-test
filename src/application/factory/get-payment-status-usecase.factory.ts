import { GetPaymentStatusUseCase } from '@/application/usecase/payment/get-payment-status.usecase';
import { BillingRepo } from '@/infra/data/repo/billing.repo';

export const GetPaymentStatusUseCaseName = 'GetPaymentStatusUseCase';

export const getPaymentStatusUseCaseFactory = {
  provide: GetPaymentStatusUseCaseName,
  inject: [BillingRepo.name],
  useFactory: (billingRepo) => {
    return new GetPaymentStatusUseCase(billingRepo);
  },
};
