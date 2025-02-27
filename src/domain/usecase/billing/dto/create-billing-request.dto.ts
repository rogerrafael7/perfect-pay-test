import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';
import { CreditCardDto } from '@/domain/gateway/dto/credit-card.dto';
import { CreditCardHolderInfoDto } from '@/domain/gateway/dto/credit-card-holder-info.dto';

export class CreateBillingRequestDto {
  @ApiProperty({ enum: BillingEnum, example: BillingEnum.BOLETO })
  @IsEnum(BillingEnum)
  @IsNotEmpty()
  billingType: BillingEnum;

  @ApiProperty({ example: 100.9 })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: '2025-03-10' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiPropertyOptional({ type: CreditCardDto })
  @IsOptional()
  creditCard?: CreditCardDto;

  @ApiPropertyOptional({ type: CreditCardHolderInfoDto })
  @IsOptional()
  creditCardHolderInfo?: CreditCardHolderInfoDto;
}
