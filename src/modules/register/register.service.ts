import { BadRequestException, Injectable } from '@nestjs/common';
import { Register } from 'src/schemas/register.schema';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { CreateRegisterDto } from './dtos/create-register';
import { RegisterRepository } from './register.repository';

@Injectable()
export class RegisterService {
  constructor(
    private readonly registerRepository: RegisterRepository,
    private readonly accountService: AccountService,
    private readonly categoryService: CategoryService,
  ) {}

  public async save(createRegisterDto: CreateRegisterDto): Promise<void> {
    const { accountId, categoryId, buyed, spendingPlace, value } =
      createRegisterDto;

    const acccount = await this.accountService.getAccountById(accountId, [
      'user',
    ]);

    if (!acccount) {
      throw new BadRequestException({
        message: 'The account informed not exists',
      });
    }

    const category = await this.categoryService.getCategoryById(categoryId);

    if (!category) {
      throw new BadRequestException({
        message: 'The category informed not exists',
      });
    }

    await this.registerRepository.save({
      account: acccount,
      category: category,
      buyed,
      spendingPlace,
      boughtBy: acccount.user.name,
      value,
    });
  }

  public async getRegisters(populate?: string[]): Promise<Register[]> {
    return await this.registerRepository.findAll(populate);
  }

  public async getRegisterById(
    id: string,
    populate?: string[],
  ): Promise<Register> {
    return await this.registerRepository.findOne({ _id: id }, populate);
  }

  public async deleteRegister(id: string): Promise<void> {
    await this.registerRepository.delete({ _id: id });
  }
}
