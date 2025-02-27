import { DoLoginUseCase } from '@/application/usecase/auth/do-login.usecase';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { SecurityUtil } from '@/infra/shared/utils/security.util';
import { DoLoginInputDto } from '@/domain/usecase/auth/dto/do-login.dto';
import {
  SERVER_EXCEPTION_CODE,
  ServerException,
} from '@/infra/shared/exceptions/server.exception';

jest.mock('@/infra/shared/utils/security.util');

describe('DoLoginUseCase', () => {
  let doLoginUseCase: DoLoginUseCase;
  let userRepositoryMock: UserRepositoryDomain;

  beforeEach(() => {
    userRepositoryMock = {
      findUserByTaxId: jest.fn(),
    } as unknown as UserRepositoryDomain;

    doLoginUseCase = new DoLoginUseCase(userRepositoryMock);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(doLoginUseCase).toBeDefined();
  });

  describe('execute', () => {
    const loginInput: DoLoginInputDto = {
      taxId: '12345678900',
      password: 'password123',
    };

    const mockUser = {
      id: 1,
      name: 'Test User',
      taxId: '12345678900',
      password: 'hashedPassword',
    };

    it('should login successfully with valid credentials', async () => {
      (userRepositoryMock.findUserByTaxId as jest.Mock).mockResolvedValue(
        mockUser,
      );
      (SecurityUtil.comparePassword as jest.Mock).mockResolvedValue(true);
      (SecurityUtil.generateJwtToken as jest.Mock).mockReturnValue('jwt_token');

      const result = await doLoginUseCase.execute(loginInput);

      expect(userRepositoryMock.findUserByTaxId).toHaveBeenCalledWith(
        loginInput.taxId,
      );
      expect(SecurityUtil.comparePassword).toHaveBeenCalledWith(
        loginInput.password,
        mockUser.password,
      );
      expect(SecurityUtil.generateJwtToken).toHaveBeenCalledWith(
        {
          id: mockUser.id,
          name: mockUser.name,
          externalId: undefined,
          isAdmin: undefined,
        },
        '1d',
      );
      expect(result).toEqual({
        token: 'jwt_token',
        expiresIn: '1d',
      });
    });

    it('should throw ServerException when user is not found', async () => {
      (userRepositoryMock.findUserByTaxId as jest.Mock).mockResolvedValue(null);

      await expect(doLoginUseCase.execute(loginInput)).rejects.toThrowError(
        new ServerException(
          'Invalid credentials',
          SERVER_EXCEPTION_CODE.NOT_FOUND,
        ),
      );
      expect(userRepositoryMock.findUserByTaxId).toHaveBeenCalledWith(
        loginInput.taxId,
      );
      expect(SecurityUtil.comparePassword).not.toHaveBeenCalled();
      expect(SecurityUtil.generateJwtToken).not.toHaveBeenCalled();
    });

    it('should throw ServerException when password is incorrect', async () => {
      (userRepositoryMock.findUserByTaxId as jest.Mock).mockResolvedValue(
        mockUser,
      );
      (SecurityUtil.comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(doLoginUseCase.execute(loginInput)).rejects.toThrowError(
        new ServerException(
          'Invalid credentials',
          SERVER_EXCEPTION_CODE.UNAUTHORIZED,
        ),
      );
      expect(userRepositoryMock.findUserByTaxId).toHaveBeenCalledWith(
        loginInput.taxId,
      );
      expect(SecurityUtil.comparePassword).toHaveBeenCalledWith(
        loginInput.password,
        mockUser.password,
      );
      expect(SecurityUtil.generateJwtToken).not.toHaveBeenCalled();
    });
  });
});
