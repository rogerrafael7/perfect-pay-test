import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserInputDto {
  @ApiProperty({
    description: 'CPF',
  })
  @IsNumberString()
  @MinLength(2, { message: 'name must be at least 2 characters long' })
  @MaxLength(50, { message: 'name must be at most 50 characters long' })
  taxId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password?: string;
}

export class CreateUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  externalId: string;
}
