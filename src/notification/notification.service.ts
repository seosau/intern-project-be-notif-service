import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationReposotory } from './notification.repository';
import { GetNotificationsDto } from './dto/get-notification.dto';
import { CreateNotificationRequest, DeleteNotificationsRequest, DeleteNotificationsResponse, GetNotificationsResponse, MarkAsReadNotificationRequest, MarkAsReadNotificationsRequest, MarkAsReadotificationResponse, MarkAsReadotificationsResponse, Notification } from 'src/generated/notification';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { notificationTypeFromJSON } from 'src/generated/notification_enum';
import { IUser } from './bullmq/notif.bull.interfaces';
import { generateNotifMessage } from 'src/utils/generateNotifMessage';

@Injectable()
export class NotificationService {
  constructor(
    private readonly config: ConfigService,
    private readonly notifRepo: NotificationReposotory,
    @InjectQueue(process.env.QUEUE_NOTIFICATION_NAME || 'notification')
    private readonly notifQueue: Queue
  ) { }

  async createNotif(data: CreateNotificationRequest) {
    const notif = await this.notifRepo.createNotif(data);
    if (notif) {
      this.notifUser({
        ...notif,
        isRead: notif.isRead,
        createdAt: !!notif.createdAt ? notif.createdAt.toISOString() : '',
        deletedAt: !!notif.deletedAt ? notif.deletedAt.toISOString() : '',
      });
    }
    return notif
  }

  async getNotifs(data: GetNotificationsDto): Promise<GetNotificationsResponse> {
    return this.notifRepo.getNotif(data);
  }

  async notifUser(data: Notification) {
    const job = await this.notifQueue.add(this.config.get('SEND_NOTIF_JOB_NAME') || 'new_notification', data)
  }

  async deleteNotifs(data: DeleteNotificationsRequest) {
    const notif = await this.notifRepo.deleteNotif(data)
    return notif
  }

  async markAsReadNotif(data: MarkAsReadNotificationRequest): Promise<MarkAsReadotificationResponse> {
    const saved = await this.notifRepo.markAsReadNotif(data)
    
    if(!saved) {
      throw new Error('Mark as read err: ')
    }

    const resp: MarkAsReadotificationResponse = {
      notification: {
        id: saved.id,
        postId: saved.postId,
        creatorId: saved.creatorId,
        creatorAvtUrl: saved.creatorAvtUrl,
        receiverId: saved.receiverId,
        notifType: notificationTypeFromJSON(saved.notifType),
        message: saved.message,
        isRead: saved.isRead,
        createdAt: !!saved.createdAt ? saved.createdAt.toISOString() : '',
        deletedAt: !!saved.deletedAt ? saved.deletedAt.toISOString() : '',
      }
    }

    return resp
  }

  async markAsReadNotifs(data: MarkAsReadNotificationsRequest): Promise<MarkAsReadotificationsResponse> {
    const saved = await this.notifRepo.markAsReadNotifs(data)
    
    if(!saved) {
      throw new Error('Mark as read err: ')
    }

    const resp: MarkAsReadotificationsResponse = {
      notifications: saved.map((notif) => ({
        id: notif.id,
        postId: notif.postId,
        creatorId: notif.creatorId,
        creatorAvtUrl: notif.creatorAvtUrl,
        receiverId: notif.receiverId,
        notifType: notificationTypeFromJSON(notif.notifType),
        message: notif.message,
        isRead: notif.isRead,
        createdAt: !!notif.createdAt ? notif.createdAt.toISOString() : '',
        deletedAt: !!notif.deletedAt ? notif.deletedAt.toISOString() : '',
      }))
    }

    return resp
  }

  async updateNotifByUser (user: IUser) {
      const notifs = await this.notifRepo.findByCreatorId(user.id);
      if(notifs.length === 0) {
        return [];
      }

      const creatorAvtUrl = user.image
      const creatorName = user.fullName

      const notifsToSave = notifs.map((notif) => ({
        ...notif,
        creatorAvtUrl: creatorAvtUrl,
        message: generateNotifMessage(notif.notifType, creatorName),
      }))

      const savedNotifs = await this.notifRepo.updateNotifs(notifsToSave)

      return savedNotifs;
  }
}
