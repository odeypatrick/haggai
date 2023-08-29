import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest } from './dto/create-account.request';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Create a new account
  @Post()
  @ApiTags('Accounts')
  async createAccount(@Body() request: CreateAccountRequest) {
    return this.accountService.createAccount(request);
  }

  @Get()
  @ApiTags('Accounts')
  async getAccounts() {
    return this.accountService.getAccounts()
  }

  // 0190158519
  @ApiParam({ name: 'accountNumber', description: 'Account number' })
  @Get('/accounts/:accountNumber')
  @ApiTags('Accounts')
  async getDetailsByAccountNumber(
    @Param() 
    params: any) {
    return this.accountService.getUserDetailsByAccountNumber(params.accountNumber)
  }
}
