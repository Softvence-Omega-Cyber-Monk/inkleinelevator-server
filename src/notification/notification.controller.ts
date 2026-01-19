import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }


  @Get("getAllOwnNotification")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Own All Notification"
  })
  async getAllOwnNotification(@Req() req: any) {
    const userId = req.user.userId;

    const result = await this.notificationService.getOwnAllNotification(userId);

    return {
      success: true,
      message: "All Notification retrived successfully",
      data: result
    }
  }

  @Patch("/isSeen/:notificationId")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Is Seen Update"
  })
  async isSeenUpdate(@Param("notificationId") notificationId: string) {
    const result = await this.notificationService.isSeenNotificationUpdate(notificationId);

    return {
      success: true,
      data: result
    }

  }


}
