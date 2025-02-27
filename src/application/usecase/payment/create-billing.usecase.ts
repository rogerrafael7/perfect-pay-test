import { CreateBillingUseCaseDomain } from '@/domain/usecase/billing/create-billing.usecase';
import { CreateBillingDto } from '@/domain/usecase/billing/dto/create-billing.dto';
import { PaymentsGateway } from '@/domain/gateway/payments.gateway';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';
import { CreateBillingResponseDto } from '@/domain/usecase/billing/dto/create-billing-response.dto';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';

export class CreateBillingUseCase implements CreateBillingUseCaseDomain {
  constructor(
    private readonly billingGateway: PaymentsGateway,
    private readonly billingRepository: BillingRepositoryDomain,
    private readonly userRepository: UserRepositoryDomain,
  ) {}

  async execute(payment: CreateBillingDto): Promise<CreateBillingResponseDto> {
    const mappingBillingTyps = {
      [BillingEnum.CREDIT_CARD]: (payload) =>
        this.billingGateway.createCreditCardPayment(payload),
      [BillingEnum.BOLETO]: (payload) =>
        this.billingGateway.createSlipPayment(payload),
      [BillingEnum.PIX]: (payload) =>
        this.billingGateway.createPixPayment(payload),
    };

    const result = await mappingBillingTyps[payment.billingType](payment);

    const user = await this.userRepository.findByExternalId(result.customer);

    const billingModel = await this.billingRepository.create({
      externalId: result.id,
      status: result.status,
      object: result.object,
      value: result.value,
      netValue: result.netValue,
      originalValue: result.originalValue,
      dueDate: result.dueDate,
      billingType: result.billingType,
      userId: user.id,
    });

    return {
      ...result,
      id: billingModel.id,
      externalId: result.id,
    };
  }
}
