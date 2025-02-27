import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';
import { CreditCardDto } from '@/domain/gateway/dto/credit-card.dto';
import { CreditCardHolderInfoDto } from '@/domain/gateway/dto/credit-card-holder-info.dto';

export class CreateBillingDto {
  @ApiProperty({ example: 'cus_000005219613' })
  @IsString()
  @IsNotEmpty()
  customer: string;

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

  @ApiPropertyOptional({ example: '123.456.789.000' })
  @IsIP()
  @IsOptional()
  remoteIp?: string;
}
