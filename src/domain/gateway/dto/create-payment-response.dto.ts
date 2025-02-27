import { ApiProperty } from '@nestjs/swagger';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';

export class CreatePaymentResponseDto<Extra, IdType = string> {
  @ApiProperty()
  object: string;

  @ApiProperty()
  id: IdType;

  @ApiProperty()
  dateCreated: string;

  @ApiProperty()
  customer: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  netValue: number;

  @ApiProperty()
  originalValue: number;

  @ApiProperty()
  dueDate: string;

  @ApiProperty()
  billingType: BillingEnum;

  @ApiProperty()
  status: string;

  @ApiProperty()
  extra: Extra;
}
