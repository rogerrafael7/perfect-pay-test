import { CreateUserUseCase } from '@/application/usecase/user/create-user.usecase';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { PaymentsGateway } from '@/domain/gateway/payments.gateway';
import { SecurityUtil } from '@/infra/shared/utils/security.util';
import { CreateUserInputDto } from '@/domain/usecase/user/dto/create-user.dto';
import { UserModel } from '@/domain/model/user.model';

jest.mock('@/infra/shared/utils/security.util');

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryMock: UserRepositoryDomain;
  let paymentsGatewayMock: PaymentsGateway;

  beforeEach(() => {
    userRepositoryMock = {
      createUser: jest.fn(),
    } as unknown as UserRepositoryDomain;

    paymentsGatewayMock = {
      createCustomer: jest.fn(),
    } as unknown as PaymentsGateway;

    createUserUseCase = new CreateUserUseCase(
      userRepositoryMock,
      paymentsGatewayMock,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a user successfully', async () => {
      const userInput: CreateUserInputDto = {
        name: 'Test User',
        taxId: '12345678900',
        password: 'password123',
      };

      const hashedPassword = 'hashed_password';
      const externalId = 'customer_123';

      const expectedUserModel: UserModel = {
        ...userInput,
        password: hashedPassword,
        externalId,
      };

      const createdUser = {
        id: 1,
        ...expectedUserModel,
      };

      (SecurityUtil.hashPassword as jest.Mock).mockResolvedValue(
        hashedPassword,
      );

      (paymentsGatewayMock.createCustomer as jest.Mock).mockResolvedValue({
        id: externalId,
      });

      (userRepositoryMock.createUser as jest.Mock).mockResolvedValue(
        createdUser,
      );

      const result = await createUserUseCase.execute(userInput);

      expect(SecurityUtil.hashPassword).toHaveBeenCalledWith(
        userInput.password,
      );
      expect(paymentsGatewayMock.createCustomer).toHaveBeenCalledWith({
        name: userInput.name,
        cpfCnpj: userInput.taxId,
      });
      expect(userRepositoryMock.createUser).toHaveBeenCalledWith(
        expectedUserModel,
      );
      expect(result).toEqual({
        id: createdUser.id,
        externalId,
      });
    });

    it('should propagate errors from payments gateway', async () => {
      const userInput: CreateUserInputDto = {
        name: 'Test User',
        taxId: '12345678900',
        password: 'password123',
      };

      const error = new Error('Failed to create customer');

      (SecurityUtil.hashPassword as jest.Mock).mockResolvedValue(
        'hashed_password',
      );
      (paymentsGatewayMock.createCustomer as jest.Mock).mockRejectedValue(
        error,
      );

      await expect(createUserUseCase.execute(userInput)).rejects.toThrow(error);
    });

    it('should propagate errors from user repository', async () => {
      const userInput: CreateUserInputDto = {
        name: 'Test User',
        taxId: '12345678900',
        password: 'password123',
      };

      const error = new Error('Failed to create user');

      (SecurityUtil.hashPassword as jest.Mock).mockResolvedValue(
        'hashed_password',
      );
      (paymentsGatewayMock.createCustomer as jest.Mock).mockResolvedValue({
        id: 'customer_123',
      });
      (userRepositoryMock.createUser as jest.Mock).mockRejectedValue(error);

      await expect(createUserUseCase.execute(userInput)).rejects.toThrow(error);
    });
  });
});
