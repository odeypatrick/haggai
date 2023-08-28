import { NestFactory } from '@nestjs/core';
import { TransactionModule } from './transaction.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(TransactionModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TRANSACTION'));
  await app.startAllMicroservices();
}
bootstrap();
