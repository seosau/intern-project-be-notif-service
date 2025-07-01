import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './configs/typeorm.config';
import { BullModule } from '@nestjs/bullmq';
import { bullMQConfig, queueAsyncConfig, updateNotifByUserQueueAsyncConfig } from './configs/bullMQ.config';

@Module({
  imports: [
    NotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BullModule.forRootAsync(bullMQConfig),
    // BullModule.registerQueue(queueAsyncConfig),
    BullModule.registerQueueAsync(updateNotifByUserQueueAsyncConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
