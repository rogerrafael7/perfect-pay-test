import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBillingUseCaseDomain } from '@/domain/usecase/billing/create-billing.usecase';
import { CreateBillingUseCaseName } from '@/application/factory/create-billing-usecase.factory';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBillingRequestDto } from '@/domain/usecase/billing/dto/create-billing-request.dto';
import { RequestApplication } from '@/infra/shared/types/request-application.type';
import { CreateBillingResponseDto } from '@/domain/usecase/billing/dto/create-billing-response.dto';
import { ReceiveEventPaymentUseCaseName } from '@/application/factory/receive-event-payment-use-case.factory';
import { ReceiveEventPaymentUseCaseDomain } from '@/domain/usecase/billing/receive-event-payment.usecase';
import { ReceiveEventPaymentDto } from '@/domain/usecase/billing/dto/receive-event-payment.dto';
import { envs } from '@/envs';
import { Public } from '@/application/decorator/public.decorator';
import { GetPaymentStatusUseCaseName } from '@/application/factory/get-payment-status-usecase.factory';
import { GetPaymentStatusUseCaseDomain } from '@/domain/usecase/billing/get-payment-status.usecase';

@ApiBearerAuth()
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(CreateBillingUseCaseName)
    private readonly createBillingUseCase: CreateBillingUseCaseDomain,
    @Inject(ReceiveEventPaymentUseCaseName)
    private readonly receiveEventPaymentUseCase: ReceiveEventPaymentUseCaseDomain,
    @Inject(GetPaymentStatusUseCaseName)
    private readonly getPaymentStatusUseCase: GetPaymentStatusUseCaseDomain,
  ) {}

  @ApiOperation({ summary: 'Create Billing' })
  @ApiResponse({
    status: 200,
    type: CreateBillingResponseDto,
  })
  @Post('/billing')
  async createBilling(
    @Body() payload: CreateBillingRequestDto,
    @Req() request: RequestApplication,
  ) {
    return await this.createBillingUseCase.execute({
      ...payload,
      remoteIp: request.ip,
      customer: request.user.externalId,
    });
  }

  @Get('/:id/status')
  async getPaymentStatus(@Param('id') id: string) {
    return await this.getPaymentStatusUseCase.execute(+id);
  }

  @Public()
  @Post('/webhook-receive-event')
  async receiveEventPayment(
    @Body() payload: ReceiveEventPaymentDto,
    @Req() request: Request,
  ) {
    if (request.headers['asaas-access-token'] !== envs.ASAAS_INTERN_SECRET) {
      throw new UnauthorizedException('Unauthorized');
    }
    return await this.receiveEventPaymentUseCase.execute(payload);
  }
}
