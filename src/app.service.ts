import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(private prisma: PrismaService) { }

  async onApplicationBootstrap() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.PASSWORD || '12345678';
    const adminPhone = process.env.ADMIN_PHONE || '0000000000';

    // Automatically delete any existing SUPER_ADMIN users
    await this.prisma.user.deleteMany({
      where: {
        role: 'SUPER_ADMIN',
      },
    });

    const existingAdmin = await this.prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });

    if (!existingAdmin) {
      this.logger.log('No ADMIN found. Seeding default admin...');
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      try {
        await this.prisma.user.create({
          data: {
            name: 'Admin',
            email: adminEmail,
            phone: adminPhone,
            password: hashedPassword,
            role: 'ADMIN',
            isAgree: true,
            verifidStatus: 'VERIFID',
          },
        });
        this.logger.log(`Admin created successfully with email: ${adminEmail}`);
      } catch (error) {
        this.logger.error('Failed to seed admin', error);
      }
    } else {
      this.logger.log('ADMIN already exists. Skipping seed.');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
