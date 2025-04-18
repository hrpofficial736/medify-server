import { Body, Controller, Post, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { VerifyPaymentDto } from 'src/common/interfaces/payment-interfaces';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}
  @Post('create-order')
  async paymentController(
    @Body() body: { amount: string },
    @Res() response: Response,
  ) {
    const responseFromService = await this.paymentService.paymentService(
      body.amount,
    );
    response.status(responseFromService.statusCode).json({
      message: responseFromService.message,
      data: responseFromService.data,
    });
  }
  @Post("verify-payment")
  async paymentVerificationController(
    @Body() body: { verifyPaymentDto: VerifyPaymentDto },
    @Res() response: Response,
  ) {
    const responseFromService = await this.paymentService.paymentVerifyService(
      body.verifyPaymentDto,
    );
    response.status(responseFromService.statusCode).json({
      message: responseFromService.message,
    });
  }
}
