import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest } from './dto/create-account.request';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Create a new account
  @Post()
  async createAccount(@Body() request: CreateAccountRequest) {
    return this.accountService.createAccount(request);
  }

  @Get()
  async getAccounts() {
    return this.accountService.getAccounts()
  }
}
