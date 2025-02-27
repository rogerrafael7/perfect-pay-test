import { CreateBasicPaymentDto } from '@/domain/gateway/dto/create-basic-payment.dto';
import { CreateCreditCardPaymentDto } from '@/domain/gateway/dto/create-credit-card-payment.dto';
import { CreateSlipPaymentResponseDto } from '@/domain/gateway/dto/create-slip-payment-response.dto';
import { CreateCreditCardPaymentResponseDto } from '@/domain/gateway/dto/create-credit-card-payment-response.dto';
import { CreatePixPaymentResponseDto } from '@/domain/gateway/dto/create-pix-payment-response.dto';
import { CreateCustomerDto } from '@/domain/gateway/dto/create-customer.dto';
import { CreateCustomerResponseDto } from '@/domain/gateway/dto/create-customer-response.dto';

export type PaymentsGatewayEventWebhook =
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_CONFIRMED';

export interface PaymentsGatewayWebhook {
  name: string;
  url: string;
  enabled: boolean;
  events: PaymentsGatewayEventWebhook[];
  interrupted: boolean;
  sendType: 'SEQUENTIALLY' | 'NON_SEQUENTIALLY';
}
export interface PaymentsGateway {
  createSlipPayment(
    payment: CreateBasicPaymentDto,
  ): Promise<CreateSlipPaymentResponseDto>;
  createCreditCardPayment(
    payment: CreateCreditCardPaymentDto,
  ): Promise<CreateCreditCardPaymentResponseDto>;
  createPixPayment(payment: any): Promise<CreatePixPaymentResponseDto>;
  isWebhookRegistered(webhookUrl: string): Promise<boolean>;
  registerWebhook(webhook: PaymentsGatewayWebhook): Promise<void>;
  removeWebhook(webhookId: string): Promise<void>;
  createCustomer(data: CreateCustomerDto): Promise<CreateCustomerResponseDto>;
}
