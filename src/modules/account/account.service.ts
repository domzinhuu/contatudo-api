import { Injectable, Logger } from '@nestjs/common';
import { Account } from 'src/schemas/account.schema';
import { AccountRepository } from './account.repository';
@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly accountRepository: AccountRepository) {}

  async create(description: string, user: string): Promise<Account> {
    this.logger.log(`create a account: description - ${description}`);
    const saved = await this.accountRepository.save({ description, user });
    return saved;
  }

  async getAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async getAccountById(
    accountId: string,
    populate?: string[],
  ): Promise<Account> {
    return await this.accountRepository.findOne({ _id: accountId }, populate);
  }

  async getAccountByUser(
    userId: string,
    populate?: string[],
  ): Promise<Account> {
    return await this.accountRepository.findByUser(userId, populate);
  }
}
