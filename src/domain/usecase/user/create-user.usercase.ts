import {
  CreateUserInputDto,
  CreateUserResponseDto,
} from '@/domain/usecase/user/dto/create-user.dto';

export interface CreateUserUseCaseDomain {
  execute(data: CreateUserInputDto): Promise<CreateUserResponseDto>;
}
