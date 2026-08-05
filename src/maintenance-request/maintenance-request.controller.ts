import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MaintenanceRequestService } from './maintenance-request.service';
import { RequestMaintenanceDto } from './dto/request-maintenance.dto';

@ApiTags('maintenance-request')
@Controller('maintenance-request')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {}

  @Post('request')
  @ApiOperation({
    summary: 'Request elevator maintenance contract evaluation',
  })
  async requestMaintenance(@Body() dto: RequestMaintenanceDto) {
    const result =
      await this.maintenanceRequestService.sendMaintenanceRequestMail(dto);

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  }
}
