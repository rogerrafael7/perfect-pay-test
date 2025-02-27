import { CreateBillingUseCase } from '@/application/usecase/payment/create-billing.usecase';
import { PaymentGatewayName } from '@/application/factory/payment-gateway.factory';
import { PaymentsGateway } from '@/domain/gateway/payments.gateway';
import { BillingRepo } from '@/infra/data/repo/billing.repo';
import { UserRepo } from '@/infra/data/repo/user.repo';

export const CreateBillingUseCaseName = 'CreateBillingUseCase';

export const createBillingUseCaseFactory = {
  provide: CreateBillingUseCaseName,
  inject: [PaymentGatewayName, BillingRepo.name, UserRepo.name],
  useFactory: (paymentGateway: PaymentsGateway, billingRepo, userRepo) => {
    return new CreateBillingUseCase(paymentGateway, billingRepo, userRepo);
  },
};
