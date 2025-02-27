import { CreatePaymentResponseDto } from '@/domain/gateway/dto/create-payment-response.dto';
import { CreateSlipPaymentResponseDto } from '@/domain/gateway/dto/create-slip-payment-response.dto';
import { CreateCreditCardPaymentResponseDto } from '@/domain/gateway/dto/create-credit-card-payment-response.dto';
import { CreatePixPaymentResponseDto } from '@/domain/gateway/dto/create-pix-payment-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBillingResponseDto extends CreatePaymentResponseDto<
  | CreateSlipPaymentResponseDto['extra']
  | CreateCreditCardPaymentResponseDto['extra']
  | CreatePixPaymentResponseDto['extra'],
  number
> {
  @ApiProperty({ example: 'external_id_example' })
  externalId: string;
}
