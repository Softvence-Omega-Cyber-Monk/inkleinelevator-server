import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobBidProposalInterface } from './type/bid.type';

@Injectable()
export class BidService {

    constructor(private prisma: PrismaService) { }


    async createBid(data: JobBidProposalInterface) {

        const checkBidRequest = await this.prisma.bid.findFirst({
            where: {
                jobId: data.jobId,
                status: "ACCEPTED"
            }
        });


        if (checkBidRequest) throw new HttpException("This job already has accepted an bid. You Cnnot place another bid", 400);

        const findBid = await this.prisma.bid.findFirst({
            where: {
                userId: data.userId,
                jobId: data.jobId
            }
        });

        if (findBid) throw new HttpException("Already Bid This Job", 400);




        const bid = await this.prisma.bid.create({
            data: {
                ...data
            }
        });

        return bid;

    }

    async deleteBid(userId: string, bidId: string) {

    };

    async acceptBid(userId: string, jobId: string, bidId: string) {
        const result = await this.prisma.bid.findFirst({
            where: {
                bidId: bidId
            },
            include: {
                job: true
            }
        });

        if (!result) throw new NotFoundException("Bid Not Found");

        if (result?.job?.userId !== userId) throw new HttpException("Access Decliene, You are not permitted access this route", 403);

        await this.prisma.bid.update({
            where: {
                bidId: bidId
            },
            data: {
                status: "ACCEPTED"
            }
        });

        await this.prisma.job.update({
            where: {
                jobId: jobId
            },
            data: {
                jobStatus: "INPROGRESS"
            }
        });       

        return null;
    }

    

}
