import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post("create-review")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create review"
  })
  async createReview(@Body() dto: CreateReviewDto, @Req() req: any) {
    const reviewerId = req.user.userId;
    const data = await this.reviewService.createReview(dto, reviewerId);

    return {
      success: true,
      message: "Review Created Success",
      data: data
    }

  }


}
