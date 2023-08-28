import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Get('users')
  async getUsers() {
    return this.usersService.getAllUsers();
  }
  
  // 0190158519
  @ApiParam({ name: 'accountNumber', description: 'Account number' })
  @Get('/accounts/:accountNumber')
  async getDetailsByAccountNumber(
    @Param() 
    params: any) {
    return this.usersService.getUserDetailsByAccountNumber(params.accountNumber)
  }
}