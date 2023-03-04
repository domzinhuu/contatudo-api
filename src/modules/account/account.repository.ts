import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/repository-base';
import { Account } from 'src/schemas/account.schema';

@Injectable()
export class AccountRepository extends BaseRepository<Account> {
  constructor(@InjectModel('Account') private accountModel: Model<Account>) {
    super(accountModel);
  }

  async findByUser(user: string, populate?: string[]): Promise<any> {
    return this.schemaModel.findOne({ user }).populate(populate);
  }
}
