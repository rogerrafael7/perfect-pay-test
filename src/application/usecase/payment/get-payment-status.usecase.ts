import { GetPaymentStatusUseCaseDomain } from '@/domain/usecase/billing/get-payment-status.usecase';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';

export class GetPaymentStatusUseCase implements GetPaymentStatusUseCaseDomain {
  constructor(private readonly billingRepo: BillingRepositoryDomain) {}
  async execute(billingId: number): Promise<{ status: string }> {
    const payment = await this.billingRepo.findById(billingId);
    return {
      status: payment.status,
    };
  }
}
