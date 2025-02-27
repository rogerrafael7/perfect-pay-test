import { ICreatePaymentResponse } from '@/infra/gateway/interfaces/create-payment-response.interface';

export type ICreatePixPaymentResponse = ICreatePaymentResponse & {
  pixTransaction: {
    endToEndId: string;
    qrCode: string;
    qrCodeUrl: string;
  };
};
