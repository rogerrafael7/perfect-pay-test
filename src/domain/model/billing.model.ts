export class BillingModel {
  id?: number;
  externalId: string;
  status: string;
  object: string;
  value: number;
  netValue: number;
  originalValue: number;
  dueDate: string;
  billingType: string;
  userId: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
