import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

    constructor(
        private prisma: PrismaService,
        @Inject('STRIPE') private stripe: Stripe
    ) { }

    async paymentSingleJob(amount: number, userId: string, jobId: string) {

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            capture_method: "automatic",
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                userId: userId,
                jobId: jobId
            }
        });


        const payment = await this.prisma.payment.create({
            data: {
                amount: amount,
                userId: userId,
                stripePaymentId: paymentIntent.id,
                jobId: jobId
            }
        });

        return {
            payment,
            clientSecret: paymentIntent.client_secret
        }
    }

    async handleWebhookEvent(event: Stripe.Event) {

        try {
            switch (event.type) {
                case 'payment_intent.succeeded':
                    await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
                    break;

                case 'payment_intent.payment_failed':
                    await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
                    break;

                case 'payment_intent.canceled':
                    await this.handlePaymentCanceled(event.data.object as Stripe.PaymentIntent);
                    break;

                case 'payment_intent.created':
                    console.log('🆕 Payment intent created (no action needed)');
                    break;

                case 'charge.succeeded':
                    console.log('💳 Charge succeeded (handled by payment_intent.succeeded)');
                    break;

                case 'charge.updated':
                    console.log('🔄 Charge updated (no action needed)');
                    break;

                default:
                    console.log(`ℹ️ Unhandled event type: ${event.type}`);
            }

        } catch (error) {

            throw error;
        }
    }

    private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {

        const existingPayment = await this.prisma.payment.findFirst({
            where: { stripePaymentId: paymentIntent.id }
        });

        if (!existingPayment) {
            return;
        }


        // Update Payment Status
        const updated = await this.prisma.payment.update({
            where: { paymentId: existingPayment.paymentId },
            data: {
                status: 'PAID',
            },
        });

        await this.prisma.job.update({
            where: {
                jobId: updated.jobId
            },
            data: {
                paymentStatus: "PAID"
            }
        })

        console.log("Payment Success");

    }

    private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {

        const updated = await this.prisma.payment.updateMany({
            where: { stripePaymentId: paymentIntent.id },
            data: { status: 'CANCEL' }
        });


        if (updated.count > 0) {
            console.log('Payment marked as CANCEL');
        } else {
            console.warn('No payment found to mark as CANCEL');
        }

        console.log(`End Payment Faild`);
    }

    private async handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {

        const updated = await this.prisma.payment.updateMany({
            where: { stripePaymentId: paymentIntent.id },
            data: { status: 'CANCEL' }
        });

        if (updated.count > 0) {
            console.log('Payment marked as CANCEL');
        } else {
            console.warn('No payment found to mark as CANCEL');
        }
        console.log('End Payment Cancled');
    }
}