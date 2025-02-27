import { GetUserUseCase } from '@/application/usecase/user/get-user.usecase';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserModelMapper } from '@/domain/mapper/user-model.mapper';
import { UserModel } from '@/domain/model/user.model';

jest.mock('@/domain/mapper/user-model.mapper');

describe('GetUserUseCase', () => {
  let getUseCase: GetUserUseCase;
  let userRepositoryMock: UserRepositoryDomain;

  beforeEach(() => {
    userRepositoryMock = {
      findById: jest.fn(),
    } as unknown as UserRepositoryDomain;

    getUseCase = new GetUserUseCase(userRepositoryMock);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should get a user by id', async () => {
      const userId = 1;
      const userModel: UserModel = {
        id: userId,
        name: 'Test User',
        taxId: '12345678900',
        externalId: 'ext-123',
        password: 'hashedPassword',
      };

      const expectedResponse = {
        id: userId,
        name: 'Test User',
      };

      (userRepositoryMock.findById as jest.Mock).mockResolvedValue(userModel);
      (UserModelMapper.toDomainGetUser as jest.Mock).mockReturnValue(
        expectedResponse,
      );

      const result = await getUseCase.execute(userId);

      expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
      expect(UserModelMapper.toDomainGetUser).toHaveBeenCalledWith(userModel);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from repository', async () => {
      const userId = 1;
      const error = new Error('User not found');

      (userRepositoryMock.findById as jest.Mock).mockRejectedValue(error);

      await expect(getUseCase.execute(userId)).rejects.toThrow(error);
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    });
  });
});
