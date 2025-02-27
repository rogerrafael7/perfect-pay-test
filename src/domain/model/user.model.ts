export interface UserModel {
  id?: number;
  taxId: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  externalId?: string;
  removedAt?: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
