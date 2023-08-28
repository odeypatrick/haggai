import { Injectable } from '@nestjs/common';
import { CreateAccountRequest } from './dto/create-account.request';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async createAccount(request: CreateAccountRequest) {
    return this.accountRepository.create(request);
  }

  async getAccounts() {
    return this.accountRepository.find({});
  }
}
