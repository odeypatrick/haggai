import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { ApiCookieAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  @ApiTags('Auth')
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Get('users')
  async getUsers() {
    return this.usersService.getAllUsers();
  }
  
  @Delete('users')
  async deleteUsers() {
    return this.usersService.deleteAllUsers();
  }

  @Get('user')
  @ApiCookieAuth()
  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  async fetchUserData(@Req() req: any) {
    return this.usersService.getUser({ username: req.user.username })
  }
}