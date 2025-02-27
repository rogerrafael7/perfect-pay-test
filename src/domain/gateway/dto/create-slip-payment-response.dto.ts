import { BillingEnum } from '@/domain/gateway/dto/billing.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePaymentResponseDto } from '@/domain/gateway/dto/create-payment-response.dto';

class Extra {
  @ApiProperty()
  invoiceUrl: string;

  @ApiProperty()
  bankSlipUrl: string;
}

export class CreateSlipPaymentResponseDto extends CreatePaymentResponseDto<Extra> {
  billingType = BillingEnum.BOLETO;
}
