import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, RmqModule } from '@app/common';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TRANSACTION_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    AuthModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
