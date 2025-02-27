import { DataSource, Repository } from 'typeorm';
import { BillingRepositoryDomain } from '@/domain/repo/billing-repository.domain';
import { BillingModel } from '@/domain/model/billing.model';
import { BillingEntity } from '@/infra/data/entity/billing.entity';

export class BillingRepo implements BillingRepositoryDomain {
  private readonly repo: Repository<BillingEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(BillingEntity);
  }

  async create(billing: BillingModel): Promise<BillingModel> {
    const newBilling = this.repo.create(billing);
    return await this.repo.save(newBilling);
  }

  async findById(id: number): Promise<BillingModel> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async updateOne(id: number, billing: Partial<BillingModel>): Promise<void> {
    await this.repo.update(id, billing);
  }

  async findByExternalId(externalId: string): Promise<BillingModel> {
    return await this.repo.findOne({
      where: { externalId },
    });
  }

  async updateOneByExternalId(
    externalId: string,
    billing: Partial<BillingModel>,
  ): Promise<void> {
    await this.repo.update({ externalId }, billing);
  }
}
