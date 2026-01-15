import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { CloudinaryProvider } from './config/CloudinaryProvider';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentModule } from './payment/payment.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, JobModule, CloudinaryModule, StripeModule, PaymentModule, BidModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
  exports: ["CLOUDINARY"]
})
export class AppModule { }
