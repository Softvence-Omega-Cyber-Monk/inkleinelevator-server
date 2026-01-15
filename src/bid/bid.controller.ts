import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { acceptJobBid, createBid } from './dto/bid.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { truncate } from 'node:fs/promises';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post("bid-jobs")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Bid Elevator One Jobs"
  })
  async bidJobs(@Body() dto: createBid, @Req() req: any) {

    const userId = req.user.userId;

    const data = {
      userId,
      ...dto
    }

    const result = await this.bidService.createBid(data);

    return {
      success: true,
      message: "Job Bidded Successfully",
      data: result
    }
  }


  @UseGuards(AuthGuard("jwt"))
  @Post("accept-bid")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Accept Job Bid"
  })
  async acceptJobBid(@Body() dto: acceptJobBid, @Req() req: any) {
    const userId = req.user.userId;

    const result = await this.bidService.acceptBid(userId, dto.jobId, dto.bidId);

    return {
      success: true,
      message: "Job Bid Accepted Success",
      data: result
    }

  }


}
