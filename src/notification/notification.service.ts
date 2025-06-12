import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationReposotory } from './notification.repository';
import { GetNotificationsDto } from './dto/get-notification.dto';
import { CreateNotificationRequest } from 'src/generated/notification';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notifRepo: NotificationReposotory
  ) {}

  async createNotif(data: CreateNotificationRequest) {
    return this.notifRepo.createNotif(data);
  }

  async getNotifs(data: GetNotificationsDto) {
    return this.notifRepo.getNotif(data);
  }
}
