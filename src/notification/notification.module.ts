import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationReposotory } from './notification.repository';
import { BullModule } from '@nestjs/bullmq';
import { notifBullProcessor } from './bullmq/notif.bull.processor';

@Module({
  imports:[
    BullModule.registerQueueAsync({
      name: 'notification'
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService, 
    NotificationReposotory,
    notifBullProcessor,
  ],
})
export class NotificationModule {}
