import { ReceiveEventPaymentDto } from '@/domain/usecase/billing/dto/receive-event-payment.dto';

export interface ReceiveEventPaymentUseCaseDomain {
  execute(event: ReceiveEventPaymentDto): Promise<void>;
}
