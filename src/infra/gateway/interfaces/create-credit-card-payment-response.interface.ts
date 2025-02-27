import { ICreatePaymentResponse } from '@/infra/gateway/interfaces/create-payment-response.interface';

export type ICreateCreditCardPaymentResponse = ICreatePaymentResponse & {
  creditCard: {
    creditCardNumber: string;
    creditCardBrand: string;
  };
};
