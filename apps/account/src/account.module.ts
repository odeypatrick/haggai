import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { AccountRepository } from './account.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';
import { AuthModule, RmqModule } from '@app/common';
import { TRANSACTION_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: "./apps/account/.env"
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    RmqModule.register({
      name: TRANSACTION_SERVICE,
    }),
    AuthModule
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
