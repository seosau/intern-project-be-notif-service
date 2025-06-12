import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationReposotory } from './notification.repository';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationReposotory],
})
export class NotificationModule {}
