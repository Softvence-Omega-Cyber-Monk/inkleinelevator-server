import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor(private prisma: PrismaService) { }

    async getOwnAllNotification(userId: string) {

        const notSeenCount = await this.prisma.nitification.count({
            where: {
                userId: userId,
                isSeen: false
            }
        })

        const result = await this.prisma.nitification.findMany({
            where: {
                userId: userId
            }
        })
        return {
            notSeenCount,
            data: result
        };
    };

    async isSeenNotificationUpdate(notificationId: string) {
        const result = await this.prisma.nitification.update({
            where: {
                notificationId: notificationId
            },
            data: {
                isSeen: true
            }
        });
        return result;

    }


}
