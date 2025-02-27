import { CreateBillingDto } from '@/domain/usecase/billing/dto/create-billing.dto';
import { CreateBillingResponseDto } from '@/domain/usecase/billing/dto/create-billing-response.dto';

export interface CreateBillingUseCaseDomain {
  execute(payment: CreateBillingDto): Promise<CreateBillingResponseDto>;
}
