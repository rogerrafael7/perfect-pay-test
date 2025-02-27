import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreditCardDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  holderName: string;

  @ApiProperty({ example: '5162306219378829' })
  @IsString()
  @Length(16, 16)
  number: string;

  @ApiProperty({ example: '05' })
  @IsString()
  @Length(2, 2)
  expiryMonth: string;

  @ApiProperty({ example: '2024' })
  @IsString()
  @Length(4, 4)
  expiryYear: string;

  @ApiProperty({ example: '318' })
  @IsString()
  @Length(3, 4)
  ccv: string;
}
