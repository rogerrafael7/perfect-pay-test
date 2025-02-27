import { CreateUserUseCaseDomain } from '@/domain/usecase/user/create-user.usercase';
import { UserModel } from '@/domain/model/user.model';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { SecurityUtil } from '@/infra/shared/utils/security.util';
import {
  CreateUserInputDto,
  CreateUserResponseDto,
} from '@/domain/usecase/user/dto/create-user.dto';
import { PaymentsGateway } from '@/domain/gateway/payments.gateway';

export class CreateUserUseCase implements CreateUserUseCaseDomain {
  constructor(
    private readonly userRepository: UserRepositoryDomain,
    private readonly paymentsGateway: PaymentsGateway,
  ) {}

  async execute(data: CreateUserInputDto): Promise<CreateUserResponseDto> {
    const password = await SecurityUtil.hashPassword(data.password);

    const { id: externalId } = await this.paymentsGateway.createCustomer({
      name: data.name,
      cpfCnpj: data.taxId,
    });

    const payload: UserModel = {
      ...data,
      externalId,
      password,
    };

    const userCreated = await this.userRepository.createUser(payload);

    return {
      id: userCreated.id,
      externalId,
    };
  }
}
