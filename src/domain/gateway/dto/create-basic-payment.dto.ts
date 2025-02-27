import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBasicPaymentDto {
  @ApiProperty({ example: 'cus_000005219613' })
  @IsString()
  @IsNotEmpty()
  customer: string;

  @ApiProperty({ example: 100.9 })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: '2025-03-10' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiPropertyOptional({ example: '123.456.789.000' })
  @IsIP()
  @IsOptional()
  remoteIp?: string;
}
