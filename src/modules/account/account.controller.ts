import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Account } from 'src/schemas/account.schema';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async saveAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    const { description, user } = createAccountDto;
    return this.accountService.create(description, user);
  }

  @Get()
  async getAllAccounts(): Promise<Account[]> {
    return this.accountService.getAll();
  }

  @Get('/:id')
  async getAccountById(@Param() { id }): Promise<Account> {
    return this.accountService.getAccountById(id, ['user']);
  }

  @Get('/user/:userId')
  async getAccountByUser(@Param() { userId }): Promise<Account> {
    return this.accountService.getAccountByUser(userId, ['user']);
  }
}
