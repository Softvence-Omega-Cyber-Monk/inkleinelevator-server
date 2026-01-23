import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProtfolioService {
    constructor(private prisma: PrismaService) { }

    async getProtfolio(userId: string) {
        const bids = await this.prisma.bid.findMany({
            where: {
                userId: userId,
                status: 'ACCEPTED',
                job: {
                    jobStatus: 'COMPLITE',
                },
            },
            include: {
                job: {
                    include: {
                        reviews: true,
                    },
                },
            },
        });

        return bids;

    }

}
