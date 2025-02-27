import { Request } from 'express';
import { JwtPayload } from '@/infra/shared/utils/security.util';

export type RequestApplication = Request & {
  user: JwtPayload;
};
