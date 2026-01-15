import { BadRequestException, HttpException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create.job.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class JobService {
    constructor(
        private prisma: PrismaService,
        private cloudinaryService: CloudinaryService,
    ) { }

    async createJob(userId: string, dto: CreateJobDto, photos: Express.Multer.File[], documents: Express.Multer.File[]) {
        const photoUrls: string[] = [];
        const documentUrls: string[] = [];

        for (const photo of photos) {
            const upload = await this.cloudinaryService.uploadFile(
                photo,
                'job/photos',
            );
            photoUrls.push(upload.secure_url);
        }

        for (const doc of documents) {
            const upload = await this.cloudinaryService.uploadFile(
                doc,
                'job/documents',
            );
            documentUrls.push(upload.secure_url);
        }

        return this.prisma.job.create({
            data: {
                userId,
                jobTitle: dto.jobTitle,
                jobType: dto.jobType,
                projectDescription: dto.projectDescription,
                technicalRequermentAndCertification:
                    dto.technicalRequirementsAndCertifications,

                elevatorType: dto.elevatorType,
                numberOfElevator: dto.numberOfElevator,
                capasity: dto.capacity,
                speed: dto.speed,
                address: dto.address,
                streetAddress: dto.streetAddress,
                city: dto.city,
                zipCode: dto.zipCode,

                estimitedBudget: dto.estimatedBudget,
                photo: photoUrls,
                documents: documentUrls,
            },
        });

    }

    async getAllJob() {
        const result = await this.prisma.job.findMany({
            where: {
                paymentStatus: "PAID",
                jobStatus: "OPEN"
            }
        });

        if (!result) throw new NotFoundException("No Paind Open Job Dos't Available");

        return result;

    };


    async getMyAllJOb(userId: string) {
        const result = await this.prisma.job.findMany({
            where: {
                userId: userId
            },
            include: {
                bids: true
            }
        });

        return result
    };


    async getSingleJobs(jobId: string) {
        const findJob = await this.prisma.job.findUnique({
            where: {
                jobId,
            },
            include: {
                bids: true,
                _count: { select: { bids: true } }
            },
        });

        if (!findJob) throw new NotFoundException("Job Not Found");

        return {
            totalBid: findJob._count.bids,
            ...findJob
        }

    }

    async pendingReview(jobId: string, elevatorUserId: string) {
        const findJob = await this.prisma.job.findFirst({
            where: {
                jobId: jobId,
            },
            include: {
                bids: true
            }
        });

        if (!findJob) {
            throw new Error("Job not found");
        }

        if (findJob?.jobStatus !== "INPROGRESS") throw new HttpException("This job is not yet ready for review. Only jobs that are currently in progress can be submitted for review.", 400)



        const acceptedBid = findJob.bids.find((bid) =>
            bid.userId === elevatorUserId &&
            bid.status === "ACCEPTED"
        );

        if (!acceptedBid) {
            throw new Error("You are not permitted to access this route");
        }

        await this.prisma.job.update({
            where: {
                jobId: jobId
            },
            data: {
                jobStatus: "PENDING_REVIEW"
            }
        });

        return null;

    }

    async compliteRequest(userId: string, jobId: string) {
        const result = await this.prisma.job.findFirst({
            where: {
                jobId: jobId
            }
        });

        if (!result) throw new NotFoundException("Job not found");

        if (result.userId !== userId) throw new NotAcceptableException("You are not permited for this route");
        console.log("Curent Job Status", result.jobStatus);
        const allowedStatuses = ["INPROGRESS", "PENDING_REVIEW"];

        if (!allowedStatuses.includes(result.jobStatus)) {
            throw new BadRequestException(
                `Job cannot be completed from status: ${result.jobStatus}`
            );
        }

        const data = await this.prisma.job.update({
            where: {
                jobId: jobId
            },
            data: {
                jobStatus: "COMPLITE"
            }
        })

        return data;

    }

}
