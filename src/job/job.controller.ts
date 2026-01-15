import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create.job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('createJob')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        jobTitle: { type: 'string' },
        jobType: { type: 'string' },
        projectDescription: { type: 'string' },
        technicalRequirementsAndCertifications: {
          type: 'array',
          items: { type: 'string' },
        },
        elevatorType: { type: 'string' },
        numberOfElevator: { type: 'number' },
        capacity: { type: 'string' },
        speed: { type: 'string' },
        address: { type: 'string' },
        streetAddress: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' },
        estimatedBudget: { type: 'string' },

        photos: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        documents: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photos', maxCount: 10 },
      { name: 'documents', maxCount: 5 },
    ]),
  )
  async createJob(
    @Body() dto: CreateJobDto,
    @Req() req: any,
    @UploadedFiles()
    files: {
      photos?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    },
  ) {
    const userId = req.user.userId;

    const photos = files.photos ?? [];
    const documents = files.documents ?? [];


    photos.forEach((file) => {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Photos must be image files');
      }
    });

    documents.forEach((file) => {
      if (file.mimetype !== 'application/pdf') {
        throw new BadRequestException('Documents must be PDF files');
      }
    });

    return this.jobService.createJob(userId, dto, photos, documents);
  };


  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Get("get-all-job")
  @ApiOperation({
    summary: "get all job"
  })
  async getAllJOb() {
    const result = await this.jobService.getAllJob();


    return {
      success: true,
      message: "All Job Retrived Successfully",
      data: result
    }

  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Get("get-myJob")
  @ApiOperation({
    summary: "Get my all job"
  })
  async getMyAllJob(@Req() req: any) {
    const userId = req.user.userId;

    const result = await this.jobService.getMyAllJOb(userId);

    return {
      success: true,
      message: "My all job retrived successfully!",
      data: result
    }

  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Get("get-single-job/:jobId")
  @ApiOperation({
    summary: "get Single Job"
  })
  async getSingleJOb(@Param("jobId") jobId: string) {
    const result = await this.jobService.getSingleJobs(jobId);

    return {
      success: true,
      message: "Retrive Single Job",
      data: result
    }
  };


  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Patch("job-ready-for-review/:jobId")
  @ApiOperation({
    summary: "Only For Elevator Update Job Status (PENDING_REVIEW)"
  })
  async jobReadyForReview(@Param("jobId") jobId: string, @Req() req: any) {
    const userId = req.user.userId;

    const result = await this.jobService.pendingReview(jobId, userId);

    return {
      success: true,
      message: "Job Complited Request Sent By Job Admin",
      data: result
    }

  }

}
