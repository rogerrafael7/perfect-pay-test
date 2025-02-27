import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { envs } from '@/envs';
import { IS_PUBLIC_KEY } from '@/application/decorator/public.decorator';
import { IS_ADMIN } from '@/application/decorator/admin.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (!req.headers.authorization) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      req.user = this.verify(token);
      if (isAdmin && !req.user.isAdmin) {
        throw new UnauthorizedException('Unauthorized');
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  verify(token: string) {
    return jwt.verify(token, envs.JWT_SECRET);
  }
}
