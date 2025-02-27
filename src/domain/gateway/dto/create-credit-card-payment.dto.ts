import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateBasicPaymentDto } from '@/domain/gateway/dto/create-basic-payment.dto';
import { CreditCardDto } from '@/domain/gateway/dto/credit-card.dto';
import { CreditCardHolderInfoDto } from '@/domain/gateway/dto/credit-card-holder-info.dto';

export class CreateCreditCardPaymentDto extends CreateBasicPaymentDto {
  @ApiPropertyOptional({ type: CreditCardDto })
  @IsOptional()
  creditCard?: CreditCardDto;

  @ApiPropertyOptional({ type: CreditCardHolderInfoDto })
  @IsOptional()
  creditCardHolderInfo?: CreditCardHolderInfoDto;
}
