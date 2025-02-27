import { ApiProperty } from '@nestjs/swagger';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';
import { CreatePaymentResponseDto } from '@/domain/gateway/dto/create-payment-response.dto';

class Extra {
  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...,',
  })
  encodedImage: string;
  @ApiProperty({
    example: '00020101021226800014br.gov.bcb.pix2574...,',
  })
  payload: string;
  @ApiProperty({
    example: '2025-03-10T23:59:59Z',
  })
  expirationDate: string;
}

export class CreatePixPaymentResponseDto extends CreatePaymentResponseDto<Extra> {
  billingType = BillingEnum.PIX;
}
