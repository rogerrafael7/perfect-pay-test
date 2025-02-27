import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreditCardHolderInfoDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678909' })
  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @ApiProperty({ example: '12345-678' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @IsNotEmpty()
  addressNumber: string;

  @ApiPropertyOptional({ example: 'Apto 101' })
  @IsString()
  @IsOptional()
  addressComplement?: string;

  @ApiProperty({ example: '1132131415' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '11987654321' })
  @IsString()
  @IsNotEmpty()
  mobilePhone: string;
}
