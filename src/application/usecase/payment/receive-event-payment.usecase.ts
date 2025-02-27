import { ReceiveEventPaymentUseCaseDomain } from '@/domain/usecase/billing/receive-event-payment.usecase';
import { ReceiveEventPaymentDto } from '@/domain/usecase/billing/dto/receive-event-payment.dto';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';

export class ReceiveEventPaymentUseCase
  implements ReceiveEventPaymentUseCaseDomain
{
  constructor(private readonly billingRepo: BillingRepositoryDomain) {}

  async execute(event: ReceiveEventPaymentDto): Promise<void> {
    await this.billingRepo.updateOneByExternalId(event.payment.id, {
      status: event.payment.status,
    });
  }
}
