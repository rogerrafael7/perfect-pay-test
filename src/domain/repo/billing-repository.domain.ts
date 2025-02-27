import { BillingModel } from '@/domain/model/billing.model';

export interface BillingRepositoryDomain {
  findById(id: number): Promise<BillingModel>;
  create(billing: BillingModel): Promise<BillingModel>;
  updateOne(id: number, billing: Partial<BillingModel>): Promise<void>;
  findByExternalId(externalId: string): Promise<BillingModel>;
  updateOneByExternalId(
    externalId: string,
    billing: Partial<BillingModel>,
  ): Promise<void>;
}
