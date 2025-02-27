import { BillingEnum } from '@/domain/gateway/dto/billing.enum';

export interface ICreatePaymentResponse {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  value: number;
  netValue: number;
  originalValue: number;
  dueDate: string;
  billingType: BillingEnum;
  status: string;
  invoiceUrl: string;
}
