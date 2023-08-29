import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';
import { BankingService } from './banking.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository, 
    private readonly bankingService: BankingService
    ) {}

    async createUser(request: CreateUserRequest) {
      try {
        // Fetch phone Number from the DB
        const accountDetails = await this.getUserDetailsByAccountNumber(request.accountNumber);
        
        if (!accountDetails || !accountDetails.length) {
          throw new UnprocessableEntityException('Account details not found.');
        }
  
        const phoneNumber = accountDetails[0].PhoneNo;

        console.log(phoneNumber)
  
        request.phoneNumber = phoneNumber;
  
        await this.validateCreateUserRequest(phoneNumber);
  
        const hashedPassword = await bcrypt.hash(request.password, 10);
  
        const user = await this.usersRepository.create({
          ...request,
          password: hashedPassword,
        });
  
        return user;
      } catch (error) {
        throw(error);
      }
    }

  private async validateCreateUserRequest(phoneNumber: string) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        phoneNumber
      });
      if (user) {
        throw new UnprocessableEntityException('Account already exists.');
      }
    } catch (err) {
      throw(err)
    }
  }

  async validateUser(identifier: string, password: string) {
    const user = await this.usersRepository.findOne({ $or: [{ phoneNumber: identifier}, { username: identifier }] });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  async getUserDetailsByAccountNumber(accountNumber: string): Promise<any> {    
    let data = `<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Header>\n    <Authenticate xmlns="http://tempuri.org/">\n      <userName>CELLULAT-0100</userName>\n      <password>infosight!12</password>\n    </Authenticate>\n  </soap:Header>\n  <soap:Body>\n    <AccountListAll xmlns="http://tempuri.org/">\n      <AccountAll>\n        <AccountNo>${accountNumber}</AccountNo>\n      </AccountAll>\n    </AccountListAll>\n  </soap:Body>\n</soap:Envelope>`;
    const response = await this.bankingService.fetchBankingAccounts(data);
    return response;
  }

  async deleteAllUsers() {
    const users = await this.usersRepository.deleteAll({});
    return users;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({});
    return users;
  }
}