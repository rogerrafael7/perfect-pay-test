import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '@/domain/model/user.model';
import { BillingEntity } from '@/infra/data/entity/billing.entity';

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'external_id' })
  externalId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'removed_at', nullable: true })
  removedAt: Date | null;

  @Column({ name: 'tax_id' })
  taxId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @OneToMany(() => BillingEntity, (billing) => billing.user)
  billingList: BillingEntity[];
}
