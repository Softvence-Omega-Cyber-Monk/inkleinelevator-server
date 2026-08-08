import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [CloudinaryModule, MailModule],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule { }
