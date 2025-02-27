export interface GetPaymentStatusUseCaseDomain {
  execute(paymentId: number): Promise<{ status: string }>;
}
