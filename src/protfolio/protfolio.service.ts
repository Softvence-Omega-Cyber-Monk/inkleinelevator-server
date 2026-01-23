import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProtfolioService {
    constructor(private prisma: PrismaService) { }

    async getProtfolio(userId: string) {
        const result = await this.prisma.bid.findMany({
            where: {
                userId: userId,
                status: "ACCEPTED"
            },
            include: {
                job: {
                    include: {
                        reviews: {
                            
                        }
                    }
                }
            }
        })
    }

}
