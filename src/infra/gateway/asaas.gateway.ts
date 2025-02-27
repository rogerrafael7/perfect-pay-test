import axios, { AxiosInstance } from 'axios';
import {
  PaymentsGateway,
  PaymentsGatewayWebhook,
} from '@/domain/gateway/payments.gateway';
import { envs } from '@/envs';
import { CreateBasicPaymentDto } from '@/domain/gateway/dto/create-basic-payment.dto';
import { Logger } from '@nestjs/common';
import { CreateCreditCardPaymentDto } from '@/domain/gateway/dto/create-credit-card-payment.dto';
import { CreateSlipPaymentResponseDto } from '@/domain/gateway/dto/create-slip-payment-response.dto';
import { CreateCreditCardPaymentResponseDto } from '@/domain/gateway/dto/create-credit-card-payment-response.dto';
import { CreatePixPaymentResponseDto } from '@/domain/gateway/dto/create-pix-payment-response.dto';
import { ICreatePixPaymentResponse } from '@/infra/gateway/interfaces/create-pix-payment-response.interface';
import { ICreateCreditCardPaymentResponse } from '@/infra/gateway/interfaces/create-credit-card-payment-response.interface';
import { ICreateSlipPaymentResponse } from '@/infra/gateway/interfaces/create-slip-payment-response.interface';
import { IGetPixQrcodeResponse } from '@/infra/gateway/interfaces/get-pix-qrcode-response.interface';
import { CreateCustomerDto } from '@/domain/gateway/dto/create-customer.dto';
import { CreateCustomerResponseDto } from '@/domain/gateway/dto/create-customer-response.dto';

export class AsaasGateway implements PaymentsGateway {
  readonly #axiosInstance: AxiosInstance;
  readonly #apiKey: string;

  constructor() {
    this.#apiKey = envs.ASAAS_API_TOKEN;
    this.#axiosInstance = axios.create({
      baseURL: envs.ASAAS_API_URL,
      headers: {
        'Content-Type': 'application/json',
        access_token: this.#apiKey,
      },
    });
  }

  async createCustomer(
    data: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    try {
      const { data: result } =
        await this.#axiosInstance.post<CreateCustomerResponseDto>(
          '/customers',
          data,
        );
      Logger.log('Cliente criado com sucesso:', result);
      return result;
    } catch (error) {
      Logger.error(
        'Erro ao criar cliente:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async createCreditCardPayment(
    payment: CreateCreditCardPaymentDto,
  ): Promise<CreateCreditCardPaymentResponseDto> {
    const paymentData = {
      billingType: 'CREDIT_CARD',
      customer: payment.customer,
      value: payment.value,
      dueDate: payment.dueDate,
      creditCard: payment.creditCard,
      creditCardHolderInfo: payment.creditCardHolderInfo,
      remoteIp: payment.remoteIp,
    };

    try {
      const {
        data: { creditCard, ...result },
      } = await this.#axiosInstance.post<ICreateCreditCardPaymentResponse>(
        '/payments',
        paymentData,
      );
      Logger.log('Cobrança por cartão de crédito criada com sucesso:', result);
      return {
        ...result,
        extra: {
          creditCard,
        },
      };
    } catch (error) {
      Logger.error(
        'Erro ao criar cobrança por cartão de crédito:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async createPixPayment(payment: any): Promise<CreatePixPaymentResponseDto> {
    const paymentData = {
      ...payment,
      billingType: 'PIX',
    };

    try {
      const { data } =
        await this.#axiosInstance.post<ICreatePixPaymentResponse>(
          '/payments',
          paymentData,
        );
      Logger.log('Cobrança por Pix criada com sucesso:', data);

      const paymentId = data.id;
      const qrCodeResponse =
        await this.#axiosInstance.get<IGetPixQrcodeResponse>(
          `/payments/${paymentId}/pixQrCode`,
        );
      Logger.log('QR Code Pix:', qrCodeResponse.data);
      return {
        ...data,
        extra: qrCodeResponse.data,
      };
    } catch (error) {
      Logger.error(
        'Erro ao criar cobrança por Pix:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async createSlipPayment(
    payment: CreateBasicPaymentDto,
  ): Promise<CreateSlipPaymentResponseDto> {
    const paymentData = {
      ...payment,
      billingType: 'BOLETO',
    };

    try {
      const {
        data: { invoiceUrl, bankSlipUrl, ...result },
      } = await this.#axiosInstance.post<ICreateSlipPaymentResponse>(
        '/payments',
        paymentData,
      );
      Logger.log('Cobrança por boleto criada com sucesso:', result);
      return {
        ...result,
        extra: {
          invoiceUrl,
          bankSlipUrl,
        },
      };
    } catch (error) {
      Logger.error(
        'Erro ao criar cobrança por boleto:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async registerWebhook(webhook: PaymentsGatewayWebhook): Promise<void> {
    try {
      const response = await this.#axiosInstance.post('/webhooks', {
        ...webhook,
        authToken: envs.ASAAS_INTERN_SECRET,
        email: envs.ASAAS_API_EMAIL,
      });
      Logger.log('Webhook registrado com sucesso:', response.data);
    } catch (error) {
      Logger.error(
        'Erro ao registrar webhook:',
        error.response?.data || error.message,
      );
    }
  }

  async removeWebhook(webhookId: string): Promise<void> {
    try {
      const response = await this.#axiosInstance.delete(
        `/webhooks/${webhookId}`,
      );
      Logger.log('Webhook removido com sucesso:', response.data);
    } catch (error) {
      Logger.error(
        'Erro ao remover webhook:',
        error.response?.data || error.message,
      );
    }
  }

  async isWebhookRegistered(webhookUrl: string): Promise<boolean> {
    const webhooks = await this.#listWebhooks();
    return webhooks.some((webhook) => webhook.url === webhookUrl);
  }

  async #listWebhooks(): Promise<PaymentsGatewayWebhook[]> {
    try {
      const response = await this.#axiosInstance.get('/webhooks');
      Logger.log('Webhooks retrieved successfully:', response.data.data);
      return response.data.data;
    } catch (error) {
      Logger.error(
        'Error retrieving webhooks:',
        error.response?.data || error.message,
      );
      return [];
    }
  }
}
