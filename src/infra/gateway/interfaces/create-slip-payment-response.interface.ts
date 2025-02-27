import { ICreatePaymentResponse } from '@/infra/gateway/interfaces/create-payment-response.interface';

export type ICreateSlipPaymentResponse = ICreatePaymentResponse & {
  invoiceUrl: string;
  bankSlipUrl: string;
};
