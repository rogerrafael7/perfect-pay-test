import { BillingModel } from '@/domain/model/billing.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/infra/data/entity/user.entity';

@Entity({ name: 'billing' })
export class BillingEntity implements BillingModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'external_id' })
  externalId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'billing_type' })
  billingType: string;

  @Column({ name: 'due_date' })
  dueDate: string;

  @Column({ name: 'net_value' })
  netValue: number;

  @Column({ name: 'object' })
  object: string;

  @Column({ name: 'original_value' })
  originalValue: number;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.billingList)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
