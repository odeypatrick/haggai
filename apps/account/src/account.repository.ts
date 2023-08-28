import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Model, Connection } from 'mongoose';
import { Account } from "./schemas/account.schema";

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
    protected readonly logger = new Logger(AccountRepository.name);

    constructor(
        @InjectModel(Account.name) accountModel: Model<Account>,
        @InjectConnection() connection: Connection,
    ) {
        super(accountModel, connection);
    }
}