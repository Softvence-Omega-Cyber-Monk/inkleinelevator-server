import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactUsDto } from './dto/contact.user.dto';

@Injectable()
export class ContactUserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async sendMailToEmail(payload: ContactUsDto) {
    const contact = await (this.prisma as any).contactMessage.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        subject: payload.subject,
        message: payload.message,
      },
    });

    const html = `
      <div style="font-family: Arial; line-height: 1.6">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phoneNumber ?? 'N/A'}</p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${payload.message}</p>
      </div>
    `;

    // Target recipient email: process.env.ADMIN_EMAIL or SMTP_USER (Kleinelevator@gmail.com)
    const targetEmail =
      process.env.ADMIN_EMAIL ||
      process.env.SMTP_USER ||
      'Kleinelevator@gmail.com';

    await this.mailService.sendMessage(
      targetEmail,
      `Contact Us: ${payload.subject}`,
      html,
    );

    return {
      message: 'Message sent successfully',
      data: contact,
    };
  }
}
