import { CreateUserUseCase } from '@/application/usecase/user/create-user.usecase';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { PaymentGatewayName } from '@/application/factory/payment-gateway.factory';

export const CreateUserUseCaseName = 'CreateUserUseCase';

export const createUserUseCaseFactory = {
  provide: CreateUserUseCaseName,
  inject: [UserRepo.name, PaymentGatewayName],
  useFactory: (userRepository, paymentGateway) =>
    new CreateUserUseCase(userRepository, paymentGateway),
};
