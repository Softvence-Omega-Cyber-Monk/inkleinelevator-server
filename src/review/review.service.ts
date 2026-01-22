import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/review.request.dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) { }

    async createReview(dto: CreateReviewDto , reviewerId : string) {
        const {  revieweeId, jobId, rating, comment } = dto;

        if (reviewerId === revieweeId) {
            throw new BadRequestException("You cannot review yourself");
        }

        const existingReview = await this.prisma.review.findFirst({
            where: {
                reviewerId,
                revieweeId,
                jobId,
            },
        });

        if (existingReview) {
            throw new BadRequestException("Review already exists for this job");
        }

        // Create review
        const review = await this.prisma.review.create({
            data: {
                reviewerId,
                revieweeId,
                jobId,
                rating,
                comment,
            },
        });

        const job = await this.prisma.job.findUnique({
            where: { jobId }
        });

        const jobTitle = job?.jobTitle || "a job";

        await this.prisma.nitification.create({
            data: {
                title: "New Review Received ⭐",
                description: `You received a ${rating}-star review for the job "${jobTitle}".`,
                logo: "REVIEW",
                userId: revieweeId
            }
        });

        await this.prisma.recentActivity.create({
            data: {
                userId: revieweeId,
                description: `Received a ${rating}-star review for "${jobTitle}".`
            }
        });

        await this.prisma.nitification.create({
            data: {
                title: "Review Submitted",
                description: `Your review for the job "${jobTitle}" has been submitted successfully.`,
                logo: "REVIEW",
                userId: reviewerId
            }
        });

        await this.prisma.recentActivity.create({
            data: {
                userId: reviewerId,
                description: `You submitted a review for "${jobTitle}".`
            }
        });

        return review;
    }

}
