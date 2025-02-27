import { UserModel } from '../model/user.model';

export interface UserRepositoryDomain {
  findById(id: number): Promise<UserModel>;
  findByExternalId(externalId: string): Promise<UserModel>;
  findUserByTaxId(taxId: string): Promise<UserModel>;
  createUser(payload: Partial<UserModel>): Promise<UserModel>;
}
