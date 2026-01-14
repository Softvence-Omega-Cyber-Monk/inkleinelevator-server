import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

    constructor(private prisma: PrismaService, @Inject('STRIPE') private stripe: Stripe) { }

    // async holdPayment(amount: number, customerId?: string) {
    //     const paymentIntent = await this.stripe.paymentIntents.create({
    //         amount,
    //         currency: 'usd',
    //         customer: customerId,
    //         payment_method_types: ['card'],
    //         capture_method: 'manual',
    //     });
    //     return paymentIntent.id;
    // }

    async paymentSingleJob(amount: number, userId: string, jobId: string) {


        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            capture_method: "automatic",
            automatic_payment_methods: {
                enabled: true
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
            // clientSecrate: paymentIntent.client_secret
            clientSecret: paymentIntent.client_secret
        }

    }


}
