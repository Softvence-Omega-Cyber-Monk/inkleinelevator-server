import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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

  @Get('all')
  @ApiOperation({
    summary: 'Get all elevator maintenance contract evaluation requests',
  })
  async getAllMaintenanceRequests() {
    const data = await this.maintenanceRequestService.getAllMaintenanceRequests();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific elevator maintenance contract evaluation request by ID',
  })
  async getMaintenanceRequestById(@Param('id') id: string) {
    const data = await this.maintenanceRequestService.getMaintenanceRequestById(id);
    return {
      success: true,
      data,
    };
  }
}
