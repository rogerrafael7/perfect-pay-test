import { UserModel } from '@/domain/model/user.model';
import { GetUserResponseDto } from '@/domain/usecase/user/dto/get-user.dto';
import { SecurityUtil } from '@/infra/shared/utils/security.util';

export class UserModelMapper {
  static toDomainGetUser(userModel: UserModel): GetUserResponseDto {
    return {
      id: userModel.id,
      taxId: SecurityUtil.obfuscate(userModel.taxId, 3, 2),
      name: userModel.name,
      isAdmin: userModel.isAdmin,
      removedAt: userModel.removedAt,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    };
  }
}
