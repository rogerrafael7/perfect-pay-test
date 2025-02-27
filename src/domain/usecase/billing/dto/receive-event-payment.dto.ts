import { ApiProperty } from '@nestjs/swagger';

export class ChargebackDto {
  @ApiProperty({ example: 'REQUESTED' })
  status: string;

  @ApiProperty({ example: 'PROCESS_ERROR' })
  reason: string;
}

export class SplitDto {
  @ApiProperty({ example: 'c788f2e1-0a5b-41b9-b0be-ff3641fb0cbe' })
  id: string;

  @ApiProperty({ example: '48548710-9baa-4ec1-a11f-9010193527c6' })
  walletId: string;

  @ApiProperty({ example: 20 })
  fixedValue: number;

  @ApiProperty({ example: 'PENDING' })
  status: string;

  @ApiProperty({ example: null })
  refusalReason: string;

  @ApiProperty({ example: null })
  externalReference: string;

  @ApiProperty({ example: null })
  description: string;
}

export class InterestDto {
  @ApiProperty({ example: 0.0 })
  value: number;

  @ApiProperty({ example: 'PERCENTAGE' })
  type: string;
}

export class FineDto {
  @ApiProperty({ example: 0.0 })
  value: number;

  @ApiProperty({ example: 'FIXED' })
  type: string;
}

export class DiscountDto {
  @ApiProperty({ example: 0.0 })
  value: number;

  @ApiProperty({ example: 0 })
  dueDateLimitDays: number;

  @ApiProperty({ example: null })
  limitedDate: string;

  @ApiProperty({ example: 'FIXED' })
  type: string;
}

export class CreditCardDto {
  @ApiProperty({ example: '8829' })
  creditCardNumber: string;

  @ApiProperty({ example: 'MASTERCARD' })
  creditCardBrand: string;

  @ApiProperty({ example: 'a75a1d98-c52d-4a6b-a413-71e00b193c99' })
  creditCardToken: string;
}

export class PaymentDto {
  @ApiProperty({ example: 'payment' })
  object: string;

  @ApiProperty({ example: 'pay_080225913252' })
  id: string;

  @ApiProperty({ example: '2021-01-01' })
  dateCreated: string;

  @ApiProperty({ example: 'cus_G7Dvo4iphUNk' })
  customer: string;

  @ApiProperty({ example: 'sub_VXJBYgP2u0eO' })
  subscription: string;

  @ApiProperty({ example: '2765d086-c7c5-5cca-898a-4262d212587c' })
  installment: string;

  @ApiProperty({ example: '123517639363' })
  paymentLink: string;

  @ApiProperty({ example: '2021-01-01' })
  dueDate: string;

  @ApiProperty({ example: '2021-01-01' })
  originalDueDate: string;

  @ApiProperty({ example: 100 })
  value: number;

  @ApiProperty({ example: 94.51 })
  netValue: number;

  @ApiProperty({ example: null })
  originalValue: number;

  @ApiProperty({ example: null })
  interestValue: number;

  @ApiProperty({ example: null })
  nossoNumero: string;

  @ApiProperty({ example: 'Pedido 056984' })
  description: string;

  @ApiProperty({ example: '056984' })
  externalReference: string;

  @ApiProperty({ example: 'CREDIT_CARD' })
  billingType: string;

  @ApiProperty({ example: 'RECEIVED' })
  status: string;

  @ApiProperty({ example: null })
  pixTransaction: string;

  @ApiProperty({ example: '2021-01-01' })
  confirmedDate: string;

  @ApiProperty({ example: '2021-01-01' })
  paymentDate: string;

  @ApiProperty({ example: '2021-01-01' })
  clientPaymentDate: string;

  @ApiProperty({ example: null })
  installmentNumber: number;

  @ApiProperty({ example: '2021-02-01' })
  creditDate: string;

  @ApiProperty({ example: null })
  custody: string;

  @ApiProperty({ example: '2021-02-01' })
  estimatedCreditDate: string;

  @ApiProperty({ example: 'https://www.asaas.com/i/080225913252' })
  invoiceUrl: string;

  @ApiProperty({ example: null })
  bankSlipUrl: string;

  @ApiProperty({
    example: 'https://www.asaas.com/comprovantes/4937311816045162',
  })
  transactionReceiptUrl: string;

  @ApiProperty({ example: '00005101' })
  invoiceNumber: string;

  @ApiProperty({ example: false })
  deleted: boolean;

  @ApiProperty({ example: false })
  anticipated: boolean;

  @ApiProperty({ example: false })
  anticipable: boolean;

  @ApiProperty({ example: '2021-01-01 12:54:56' })
  lastInvoiceViewedDate: string;

  @ApiProperty({ example: null })
  lastBankSlipViewedDate: string;

  @ApiProperty({ example: false })
  postalService: boolean;

  @ApiProperty({ type: () => CreditCardDto })
  creditCard: CreditCardDto;

  @ApiProperty({ type: () => DiscountDto })
  discount: DiscountDto;

  @ApiProperty({ type: () => FineDto })
  fine: FineDto;

  @ApiProperty({ type: () => InterestDto })
  interest: InterestDto;

  @ApiProperty({ type: () => [SplitDto] })
  split: SplitDto[];

  @ApiProperty({ type: () => ChargebackDto })
  chargeback: ChargebackDto;

  @ApiProperty({ example: null })
  refunds: string;
}

export class ReceiveEventPaymentDto {
  @ApiProperty({ example: 'evt_05b708f961d739ea7eba7e4db318f621&368604920' })
  id: string;

  @ApiProperty({ example: 'PAYMENT_RECEIVED' })
  event: string;

  @ApiProperty({ example: '2024-06-12 16:45:03' })
  dateCreated: string;

  @ApiProperty({ type: () => PaymentDto })
  payment: PaymentDto;
}
