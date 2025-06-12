import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreateNotificationRequest, NOTIFICATION_SERVICE_NAME } from 'src/generated/notification';
import { GetNotificationsDto } from './dto/get-notification.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'CreateNotification')
  async createNotification(data: CreateNotificationRequest) {
    console.log('======================================')
    return this.notificationService.createNotif(data);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'GetNotifications')
  async getNotification(data: GetNotificationsDto) {
    console.log('2222222222222222222222222222222222222222222222')
    return this.notificationService.getNotifs(data);
  }
}
