import { ApiProperty } from '@nestjs/swagger';
import { CreatePaymentResponseDto } from '@/domain/gateway/dto/create-payment-response.dto';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';

class Extra {
  @ApiProperty()
  creditCard: {
    creditCardNumber: string;
    creditCardBrand: string;
  };
}

export class CreateCreditCardPaymentResponseDto extends CreatePaymentResponseDto<Extra> {
  billingType = BillingEnum.CREDIT_CARD;
}
