import { GetPaymentStatusUseCase } from '@/application/usecase/payment/get-payment-status.usecase';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';

describe('GetPaymentStatusUseCase', () => {
  let getPaymentStatusUseCase: GetPaymentStatusUseCase;
  let billingRepositoryMock: BillingRepositoryDomain;

  beforeEach(() => {
    billingRepositoryMock = {
      findById: jest.fn(),
    } as unknown as BillingRepositoryDomain;

    getPaymentStatusUseCase = new GetPaymentStatusUseCase(
      billingRepositoryMock,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getPaymentStatusUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return payment status when billing id exists', async () => {
      const billingId = 1;
      const mockBilling = {
        id: billingId,
        status: 'confirmed',
        externalId: 'bill_123',
        object: 'billing',
        value: 1000,
        netValue: 950,
        originalValue: 1000,
        billingType: 'credit_card',
        userId: 1,
      };

      (billingRepositoryMock.findById as jest.Mock).mockResolvedValue(
        mockBilling,
      );

      const result = await getPaymentStatusUseCase.execute(billingId);

      expect(billingRepositoryMock.findById).toHaveBeenCalledWith(billingId);
      expect(result).toEqual({
        status: 'confirmed',
      });
    });

    it('should propagate errors from repository', async () => {
      const billingId = 1;
      const error = new Error('Billing not found');

      (billingRepositoryMock.findById as jest.Mock).mockRejectedValue(error);

      await expect(getPaymentStatusUseCase.execute(billingId)).rejects.toThrow(
        error,
      );
      expect(billingRepositoryMock.findById).toHaveBeenCalledWith(billingId);
    });
  });
});
