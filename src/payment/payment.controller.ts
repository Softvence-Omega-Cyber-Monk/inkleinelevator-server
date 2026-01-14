import { 
  BadRequestException, 
  Body, 
  Controller, 
  Headers, 
  HttpCode, 
  Inject, 
  Post, 
  Req,
  UseGuards 
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { createPaymentDto } from './dto/payment.request.dto';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService, 
    @Inject('STRIPE') private stripe: Stripe
  ) { }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Make Single Job Payment"
  })
  @Post("singlejob/payment/checkout")
  async singleJobPayment(@Body() dto: createPaymentDto, @Req() req: any) {

    const result = await this.paymentService.paymentSingleJob(
      dto.amount, 
      req.user.userId, 
      dto.jobId
    );

    return {
      success: true,
      message: "Payment Success",
      data: result
    }
  }

  @Post('webhook')
  @HttpCode(200)
  @ApiExcludeEndpoint()
  async handleWebhook(
    @Body() req: Buffer,
    @Headers('stripe-signature') sig: string
  ) {

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      throw new BadRequestException('Webhook secret not configured');
    }

    if (!sig) {
      throw new BadRequestException('No stripe signature');
    }

    let event: Stripe.Event;

    try {
      console.log('Verifying webhook signature...');
      
      event = this.stripe.webhooks.constructEvent(
        req,
        sig,
        endpointSecret
      );

    } catch (err) {

      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    try {
      await this.paymentService.handleWebhookEvent(event);
      return { received: true };
    } catch (err) {
      throw new BadRequestException('Error processing webhook');
    }
  }
}