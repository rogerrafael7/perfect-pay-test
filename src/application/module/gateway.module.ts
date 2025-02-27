import { Inject, Module, OnModuleInit } from '@nestjs/common';
import {
  paymentGatewayFactory,
  PaymentGatewayName,
} from '@/application/factory/payment-gateway.factory';
import { PaymentsGateway } from '@/domain/gateway/payments.gateway';
import { envs } from '@/envs';

@Module({
  providers: [paymentGatewayFactory],
  exports: [PaymentGatewayName],
})
export class GatewayModule implements OnModuleInit {
  constructor(
    @Inject(PaymentGatewayName)
    private readonly billingGateway: PaymentsGateway,
  ) {}

  async onModuleInit() {
    const webhookUrl = `${envs.PUBLIC_SERVER_URL}/payment/webhook-receive-event`;

    const isWebhookRegistered =
      await this.billingGateway.isWebhookRegistered(webhookUrl);

    if (!isWebhookRegistered) {
      await this.billingGateway.registerWebhook({
        name: 'webhook-receive-event',
        url: webhookUrl,
        enabled: true,
        interrupted: false,
        sendType: 'NON_SEQUENTIALLY',
        events: ['PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED'],
      });
    }
  }
}
