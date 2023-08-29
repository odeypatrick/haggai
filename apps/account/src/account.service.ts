import { Injectable } from '@nestjs/common';
import { CreateAccountRequest } from './dto/create-account.request';
import { AccountRepository } from './account.repository';
import { BankingService } from './banking.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly bankingService: BankingService
    ) {}

  async createAccount(request: CreateAccountRequest) {
    return this.accountRepository.create(request);
  }

  async getAccounts() {
    return this.accountRepository.find({});
  }

  async getUserDetailsByAccountNumber(accountNumber: string): Promise<any> {    
    let data = `<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Header>\n    <Authenticate xmlns="http://tempuri.org/">\n      <userName>CELLULAT-0100</userName>\n      <password>infosight!12</password>\n    </Authenticate>\n  </soap:Header>\n  <soap:Body>\n    <AccountListAll xmlns="http://tempuri.org/">\n      <AccountAll>\n        <AccountNo>${accountNumber}</AccountNo>\n      </AccountAll>\n    </AccountListAll>\n  </soap:Body>\n</soap:Envelope>`;
    const response = await this.bankingService.fetchBankingAccounts(data);
    return response;
  }
}
