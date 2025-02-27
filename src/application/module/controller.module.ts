import { Module } from '@nestjs/common';
import { AuthController } from '../presentation/http/auth/auth.controller';
import { UsecaseModule } from './usecase.module';
import { PaymentController } from '@/application/presentation/http/billing/payment.controller';
import { UserController } from '@/application/presentation/http/user/user.controller';

@Module({
  imports: [UsecaseModule],
  controllers: [AuthController, PaymentController, UserController],
})
export class ControllerModule {}
