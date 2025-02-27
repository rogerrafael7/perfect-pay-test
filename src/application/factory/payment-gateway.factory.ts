import { AsaasGateway } from '@/infra/gateway/asaas.gateway';

export const PaymentGatewayName = 'PaymentsGateway';

export const paymentGatewayFactory = {
  provide: PaymentGatewayName,
  useFactory: () => {
    return new AsaasGateway();
  },
};
