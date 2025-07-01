import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterQueueAsyncOptions, SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import { NOTIF_QUEUE_NAME } from '../notification/bullmq/notif.bull.constants';

export const bullMQConfig: SharedBullAsyncConfiguration = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
        const connectData = {
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
            password: config.get<string>('REDIS_PASSWORD'),
            username: config.get<string>('REDIS_USERNAME'),
            tls: {},
            maxRetriesPerRequest: 1000000,
        }
        console.log(connectData)
        return {
            connection: connectData
        }
    }
}

// export const queueAsyncConfig: RegisterQueueAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (consfigService: ConfigService) => ({
//     name: consfigService.get('QUEUE_NOTIFICATION_NAME'),
//   })
// }

export const queueAsyncConfig: RegisterQueueAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const queueName = configService.get('QUEUE_NOTIFICATION_NAME');
    console.log('QUEUE_NOTIFICATION_NAME =', queueName); // <-- LOG

    return {
      name: queueName, // cần đảm bảo queueName không undefined
    };
  },
};




export const updateNotifByUserQueueAsyncConfig: RegisterQueueAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (consfigService: ConfigService) => ({
    // name: consfigService.get('QUEUE_NOTIFICATION_NAME'),
    name: NOTIF_QUEUE_NAME
  })
}