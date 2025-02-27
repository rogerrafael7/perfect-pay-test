import { Global, Module } from '@nestjs/common';
import { databaseProvider } from '@/infra/data/datasource.provider';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { BillingRepo } from '@/infra/data/repo/billing.repo';

@Global()
@Module({
  providers: [
    databaseProvider,
    {
      provide: UserRepo.name,
      inject: [databaseProvider.provide],
      useFactory: (dataSource) => new UserRepo(dataSource),
    },
    {
      provide: BillingRepo.name,
      inject: [databaseProvider.provide],
      useFactory: (dataSource) => new BillingRepo(dataSource),
    },
  ],
  exports: [UserRepo.name, BillingRepo.name],
})
export class DataModule {}
