import { UserModel } from '../model/user.model';

export interface UserRepositoryDomain {
  findById(id: number): Promise<UserModel>;
  findByExternalId(externalId: string): Promise<UserModel>;
  createUser(user: UserModel): Promise<UserModel>;
  findUserByTaxId(taxId: string): Promise<UserModel>;
}
