import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN = 'IsAdmin';
export const OnlyAdmin = () => SetMetadata(IS_ADMIN, true);
