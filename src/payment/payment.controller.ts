import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { createPaymentDto } from './dto/payment.request.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Make Single Job Payment"
  })
  @Post("singlejob/payment/checkout")
  async singleJobPayment(@Body() dto: createPaymentDto, @Req() req: any) {
    const result = await this.paymentService.paymentSingleJob(dto.amount, req.user.userId, dto.jobId);


    return {
      success: true,
      message: "Payment Success",
      data: result
    }

  }

}
