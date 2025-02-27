import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserUseCaseDomain } from '@/domain/usecase/user/create-user.usercase';
import {
  CreateUserInputDto,
  CreateUserResponseDto,
} from '@/domain/usecase/user/dto/create-user.dto';
import { GetUserUseCaseDomain } from '@/domain/usecase/user/get-user.usercase';
import { GetUserResponseDto } from '@/domain/usecase/user/dto/get-user.dto';
import { GetUserUseCaseName } from '@/application/factory/get-user-usecase.factory';
import { CreateUserUseCaseName } from '@/application/factory/create-user-use-case.factory';
import { OnlyAdmin } from '@/application/decorator/admin.decorator';

@ApiBearerAuth()
@OnlyAdmin()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(CreateUserUseCaseName)
    private readonly createUserUseCase: CreateUserUseCaseDomain,
    @Inject(GetUserUseCaseName)
    private readonly getUserUseCaseDomain: GetUserUseCaseDomain,
  ) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @Post()
  async createUser(
    @Body() payload: CreateUserInputDto,
  ): Promise<CreateUserResponseDto> {
    return await this.createUserUseCase.execute(payload);
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({
    status: 200,
    description: 'User returned successfully',
    type: GetUserResponseDto,
  })
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<GetUserResponseDto> {
    return this.getUserUseCaseDomain.execute(id);
  }
}
