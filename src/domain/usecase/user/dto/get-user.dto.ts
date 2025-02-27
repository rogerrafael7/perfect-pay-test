import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  taxId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  removedAt?: Date;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
}
