import { CreateBillingUseCase } from '@/application/usecase/payment/create-billing.usecase';
import { PaymentsGateway } from '@/domain/gateway/payments.gateway';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { CreateBillingDto } from '@/domain/usecase/billing/dto/create-billing.dto';
import { BillingEnum } from '@/domain/gateway/dto/billing.enum';

describe('CreateBillingUseCase', () => {
  let createBillingUseCase: CreateBillingUseCase;
  let billingGatewayMock: PaymentsGateway;
  let billingRepositoryMock: BillingRepositoryDomain;
  let userRepositoryMock: UserRepositoryDomain;

  beforeEach(() => {
    billingGatewayMock = {
      createCreditCardPayment: jest.fn(),
      createSlipPayment: jest.fn(),
      createPixPayment: jest.fn(),
    } as unknown as PaymentsGateway;

    billingRepositoryMock = {
      create: jest.fn(),
    } as unknown as BillingRepositoryDomain;

    userRepositoryMock = {
      findByExternalId: jest.fn(),
    } as unknown as UserRepositoryDomain;

    createBillingUseCase = new CreateBillingUseCase(
      billingGatewayMock,
      billingRepositoryMock,
      userRepositoryMock,
    );
  });

  it('should be defined', () => {
    expect(createBillingUseCase).toBeDefined();
  });

  describe('execute', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      taxId: '12345678900',
      password: 'hashedPassword',
    };

    const mockCreateBillingResponse = {
      id: 'bill_123',
      status: 'processing',
      object: 'billing',
      value: 1000,
      netValue: 950,
      originalValue: 1000,
      dueDate: '2023-12-31',
      billingType: 'credit_card',
      customer: 'cus_123',
    };

    const mockBillingModel = {
      id: 1,
      externalId: 'bill_123',
      status: 'processing',
      object: 'billing',
      value: 1000,
      netValue: 950,
      originalValue: 1000,
      dueDate: '2023-12-31',
      billingType: 'credit_card',
      userId: 1,
    };

    it('should create a credit card payment successfully', async () => {
      const billingDto = {
        billingType: BillingEnum.CREDIT_CARD,
        value: 1000,
        customer: 'cus_123',
      } as CreateBillingDto;

      (
        billingGatewayMock.createCreditCardPayment as jest.Mock
      ).mockResolvedValue(mockCreateBillingResponse);
      (userRepositoryMock.findByExternalId as jest.Mock).mockResolvedValue(
        mockUser,
      );
      (billingRepositoryMock.create as jest.Mock).mockResolvedValue(
        mockBillingModel,
      );

      const result = await createBillingUseCase.execute(billingDto);

      expect(billingGatewayMock.createCreditCardPayment).toHaveBeenCalledWith(
        billingDto,
      );
      expect(userRepositoryMock.findByExternalId).toHaveBeenCalledWith(
        mockCreateBillingResponse.customer,
      );
      expect(billingRepositoryMock.create).toHaveBeenCalledWith({
        externalId: mockCreateBillingResponse.id,
        status: mockCreateBillingResponse.status,
        object: mockCreateBillingResponse.object,
        value: mockCreateBillingResponse.value,
        netValue: mockCreateBillingResponse.netValue,
        originalValue: mockCreateBillingResponse.originalValue,
        dueDate: mockCreateBillingResponse.dueDate,
        billingType: mockCreateBillingResponse.billingType,
        userId: mockUser.id,
      });
      expect(result).toEqual({
        ...mockCreateBillingResponse,
        id: mockBillingModel.id,
        externalId: mockCreateBillingResponse.id,
      });
    });

    it('should create a boleto payment successfully', async () => {
      const billingDto = {
        billingType: BillingEnum.BOLETO,
        value: 1000,
        customer: 'cus_123',
        dueDate: '2023-12-31',
      } as CreateBillingDto;

      const boletoResponse = {
        ...mockCreateBillingResponse,
        billingType: 'boleto',
      };

      const boletoBillingModel = {
        ...mockBillingModel,
        billingType: 'boleto',
      };

      (billingGatewayMock.createSlipPayment as jest.Mock).mockResolvedValue(
        boletoResponse,
      );
      (userRepositoryMock.findByExternalId as jest.Mock).mockResolvedValue(
        mockUser,
      );
      (billingRepositoryMock.create as jest.Mock).mockResolvedValue(
        boletoBillingModel,
      );

      const result = await createBillingUseCase.execute(billingDto);

      expect(billingGatewayMock.createSlipPayment).toHaveBeenCalledWith(
        billingDto,
      );
      expect(userRepositoryMock.findByExternalId).toHaveBeenCalledWith(
        boletoResponse.customer,
      );
      expect(result).toEqual({
        ...boletoResponse,
        id: boletoBillingModel.id,
        externalId: boletoResponse.id,
      });
    });

    it('should create a PIX payment successfully', async () => {
      const billingDto = {
        billingType: BillingEnum.PIX,
        value: 1000,
        customer: 'cus_123',
        dueDate: '2023-12-31',
      } as CreateBillingDto;

      const pixResponse = {
        ...mockCreateBillingResponse,
        billingType: 'pix',
      };

      const pixBillingModel = {
        ...mockBillingModel,
        billingType: 'pix',
      };

      (billingGatewayMock.createPixPayment as jest.Mock).mockResolvedValue(
        pixResponse,
      );
      (userRepositoryMock.findByExternalId as jest.Mock).mockResolvedValue(
        mockUser,
      );
      (billingRepositoryMock.create as jest.Mock).mockResolvedValue(
        pixBillingModel,
      );

      const result = await createBillingUseCase.execute(billingDto);

      expect(billingGatewayMock.createPixPayment).toHaveBeenCalledWith(
        billingDto,
      );
      expect(userRepositoryMock.findByExternalId).toHaveBeenCalledWith(
        pixResponse.customer,
      );
      expect(result).toEqual({
        ...pixResponse,
        id: pixBillingModel.id,
        externalId: pixResponse.id,
      });
    });

    it('should propagate errors from payment gateway', async () => {
      const billingDto = {
        billingType: BillingEnum.CREDIT_CARD,
        value: 1000,
        customer: 'cus_123',
      } as CreateBillingDto;

      const error = new Error('Payment processing failed');

      (
        billingGatewayMock.createCreditCardPayment as jest.Mock
      ).mockRejectedValue(error);

      await expect(createBillingUseCase.execute(billingDto)).rejects.toThrow(
        error,
      );
    });
  });
});
