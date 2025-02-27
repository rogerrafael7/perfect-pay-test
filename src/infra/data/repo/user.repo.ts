import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserModel } from '@/domain/model/user.model';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@/infra/data/entity/user.entity';
import {
  SERVER_EXCEPTION_CODE,
  ServerException,
} from '@/infra/shared/exceptions/server.exception';

export class UserRepo implements UserRepositoryDomain {
  private readonly repo: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(UserEntity);
  }

  async findUserByTaxId(taxId: string): Promise<UserModel> {
    return await this.repo.findOne({
      where: {
        taxId,
      },
    });
  }

  async findByExternalId(externalId: string): Promise<UserModel> {
    return await this.repo.findOne({
      where: {
        externalId,
      },
    });
  }

  async findById(id: number): Promise<UserModel> {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new ServerException(
        'User not found',
        SERVER_EXCEPTION_CODE.NOT_FOUND,
      );
    }
    return user;
  }

  async createUser(payload: Partial<UserModel>): Promise<UserModel> {
    const user = this.repo.create({
      ...payload,
    });
    return await this.repo.save(user);
  }
}
