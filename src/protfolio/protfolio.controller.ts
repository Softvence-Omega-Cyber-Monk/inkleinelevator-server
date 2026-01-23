import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProtfolioService } from './protfolio.service';
import { AuthGuard } from '@nestjs/passport';
import { ElevatorGuard } from 'src/guard/elevator.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('protfolio')
export class ProtfolioController {
  constructor(private readonly protfolioService: ProtfolioService) { }

  @Get("")
  @UseGuards(AuthGuard("jwt"), ElevatorGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Protfolio Only For Elevatro"
  })
  async protfolio(@Req() req: any) {
    const userId = req.user.userId;
    const result = await this.protfolioService.getProtfolio(userId);

    return {
      success: true,
      message: "Protfolio Retrived Success",
      data: result
    }
  }

}
