import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.NOTIFICATION_GRPC_URL,
      package: process.env.NOTIFICATION_GRPC_PACKAGE_NAME || 'notification',
      protoPath: join(__dirname, '../proto/notification.proto')
    }
  });
  await app.listen();
}
bootstrap();
