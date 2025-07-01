import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreateNotificationRequest, DeleteNotificationsRequest, DeleteNotificationsResponse, GetNotificationsResponse, MarkAsReadNotificationRequest, MarkAsReadNotificationsRequest, NOTIFICATION_SERVICE_NAME } from 'src/generated/notification';
import { GetNotificationsDto } from './dto/get-notification.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'CreateNotification')
  async createNotification(data: CreateNotificationRequest) {
    return this.notificationService.createNotif(data);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'GetNotifications')
  async getNotification(data: GetNotificationsDto): Promise<GetNotificationsResponse> {
    return this.notificationService.getNotifs(data);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'DeleteNotification')
  async deleteNotification(data: DeleteNotificationsRequest) {
    return this.notificationService.deleteNotifs(data);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'MarkAsReadNotification')
  async markAsReadNotification(data: MarkAsReadNotificationRequest) {
    return this.notificationService.markAsReadNotif(data);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'MarkAsReadNotifications')
  async markAsReadNotifications(data: MarkAsReadNotificationsRequest) {
    return this.notificationService.markAsReadNotifs(data);
  }
}
