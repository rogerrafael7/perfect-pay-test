import { DoLoginUseCase } from '../usecase/auth/do-login.usecase';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';

export const DoLoginUseCaseName = 'DoLoginUseCase';

export const doLoginUsecaseFactory = {
  provide: DoLoginUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepo: UserRepositoryDomain) => {
    return new DoLoginUseCase(userRepo);
  },
};
