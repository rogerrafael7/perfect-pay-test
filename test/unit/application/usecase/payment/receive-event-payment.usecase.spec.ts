import { ReceiveEventPaymentUseCase } from '@/application/usecase/payment/receive-event-payment.usecase';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';
import {
  ReceiveEventPaymentDto,
  PaymentDto,
} from '@/domain/usecase/billing/dto/receive-event-payment.dto';

describe('ReceiveEventPaymentUseCase', () => {
  let receiveEventPaymentUseCase: ReceiveEventPaymentUseCase;
  let billingRepositoryMock: BillingRepositoryDomain;

  beforeEach(() => {
    billingRepositoryMock = {
      updateOneByExternalId: jest.fn(),
    } as unknown as BillingRepositoryDomain;

    receiveEventPaymentUseCase = new ReceiveEventPaymentUseCase(
      billingRepositoryMock,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(receiveEventPaymentUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update billing status successfully', async () => {
      const paymentData: Partial<PaymentDto> = {
        id: 'pay_123',
        object: 'payment',
        dateCreated: '2023-12-31',
        customer: 'cust_123',
        subscription: 'sub_123',
        status: 'confirmed',
        installment: '123',
        paymentLink: '123',
        dueDate: '2023-12-31',
        originalDueDate: '2023-12-31',
        value: 100,
        netValue: 95,
        originalValue: 100,
        interestValue: 0,
        nossoNumero: '123456',
        description: 'Test payment',
        externalReference: '123',
        billingType: 'CREDIT_CARD',
        pixTransaction: null,
        confirmedDate: '2023-12-31',
        paymentDate: '2023-12-31',
        clientPaymentDate: '2023-12-31',
        installmentNumber: 1,
        creditDate: '2023-12-31',
        custody: null,
        estimatedCreditDate: '2023-12-31',
        invoiceUrl: 'http://example.com',
        bankSlipUrl: null,
        transactionReceiptUrl: 'http://example.com',
        invoiceNumber: '123',
        deleted: false,
        anticipated: false,
        anticipable: false,
        lastInvoiceViewedDate: '2023-12-31',
        lastBankSlipViewedDate: null,
        postalService: false,
        creditCard: {
          creditCardNumber: '1234',
          creditCardBrand: 'VISA',
          creditCardToken: 'token',
        },
        discount: {
          value: 0,
          dueDateLimitDays: 0,
          limitedDate: null,
          type: 'FIXED',
        },
        fine: { value: 0, type: 'FIXED' },
        interest: { value: 0, type: 'PERCENTAGE' },
        split: [],
        chargeback: null,
        refunds: null,
      };

      const updateDto: ReceiveEventPaymentDto = {
        id: 'evt_123',
        event: 'payment.updated',
        dateCreated: '2023-12-31',
        payment: paymentData as PaymentDto,
      };

      (
        billingRepositoryMock.updateOneByExternalId as jest.Mock
      ).mockResolvedValue(undefined);

      await receiveEventPaymentUseCase.execute(updateDto);

      expect(billingRepositoryMock.updateOneByExternalId).toHaveBeenCalledWith(
        updateDto.payment.id,
        {
          status: updateDto.payment.status,
        },
      );
    });

    it('should propagate repository errors', async () => {
      const paymentData: Partial<PaymentDto> = {
        id: 'pay_123',
        object: 'payment',
        dateCreated: '2023-12-31',
        customer: 'cust_123',
        subscription: 'sub_123',
        status: 'confirmed',
        installment: '123',
        paymentLink: '123',
        dueDate: '2023-12-31',
        originalDueDate: '2023-12-31',
        value: 100,
        netValue: 95,
        originalValue: 100,
        interestValue: 0,
        nossoNumero: '123456',
        description: 'Test payment',
        externalReference: '123',
        billingType: 'CREDIT_CARD',
        pixTransaction: null,
        confirmedDate: '2023-12-31',
        paymentDate: '2023-12-31',
        clientPaymentDate: '2023-12-31',
        installmentNumber: 1,
        creditDate: '2023-12-31',
        custody: null,
        estimatedCreditDate: '2023-12-31',
        invoiceUrl: 'http://example.com',
        bankSlipUrl: null,
        transactionReceiptUrl: 'http://example.com',
        invoiceNumber: '123',
        deleted: false,
        anticipated: false,
        anticipable: false,
        lastInvoiceViewedDate: '2023-12-31',
        lastBankSlipViewedDate: null,
        postalService: false,
        creditCard: {
          creditCardNumber: '1234',
          creditCardBrand: 'VISA',
          creditCardToken: 'token',
        },
        discount: {
          value: 0,
          dueDateLimitDays: 0,
          limitedDate: null,
          type: 'FIXED',
        },
        fine: { value: 0, type: 'FIXED' },
        interest: { value: 0, type: 'PERCENTAGE' },
        split: [],
        chargeback: null,
        refunds: null,
      };

      const updateDto: ReceiveEventPaymentDto = {
        id: 'evt_123',
        event: 'payment.updated',
        dateCreated: '2023-12-31',
        payment: paymentData as PaymentDto,
      };

      const error = new Error('Database error');

      (
        billingRepositoryMock.updateOneByExternalId as jest.Mock
      ).mockRejectedValue(error);

      await expect(
        receiveEventPaymentUseCase.execute(updateDto),
      ).rejects.toThrow(error);
      expect(billingRepositoryMock.updateOneByExternalId).toHaveBeenCalledWith(
        updateDto.payment.id,
        {
          status: updateDto.payment.status,
        },
      );
    });
  });
});
