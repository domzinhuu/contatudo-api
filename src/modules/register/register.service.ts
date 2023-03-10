import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { groupBy, sumBy } from "lodash";
import { DateTime } from "luxon";
import { Register } from "src/schemas/register.schema";
import { AccountService } from "../account/account.service";
import { CategoryService } from "../category/category.service";
import { ComparisionDataDto } from "../dashboard/dto/comparision-data.dto";
import { CreateRegisterDto } from "./dtos/create-register";
import { RegisterRepository } from "./register.repository";

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(Register.name);
  constructor(
    private readonly registerRepository: RegisterRepository,
    private readonly accountService: AccountService,
    private readonly categoryService: CategoryService
  ) {}

  public async save(createRegisterDto: CreateRegisterDto): Promise<void> {
    const { accountId, categoryId, buyed, spendingPlace, value } =
      createRegisterDto;

    const acccount = await this.accountService.getAccountById(accountId, [
      "user",
    ]);

    if (!acccount) {
      throw new BadRequestException({
        message: "The account informed not exists",
      });
    }

    const category = await this.categoryService.getCategoryById(categoryId);

    if (!category) {
      throw new BadRequestException({
        message: "The category informed not exists",
      });
    }

    this.logger.log(`saving a new register......`);
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
    this.logger.log(`getting all register`);
    return await this.registerRepository.findAll({ populate });
  }

  public async getRegisterById(
    id: string,
    populate?: string[]
  ): Promise<Register> {
    this.logger.log(`getting one register by id: ${id}`);
    return await this.registerRepository.findOne({ _id: id }, populate);
  }

  public async deleteRegister(id: string): Promise<void> {
    this.logger.log(`deleting register by id: ${id}`);
    await this.registerRepository.delete({ _id: id });
  }

  public async getRegisterByPeriod(
    accountId: string,
    startDate?: string,
    endDate?: string
  ): Promise<Register[]> {
    this.logger.log(`getting register by period:${startDate}/${endDate}`);

    const { start, end } = this.mountPeriod(startDate, endDate);

    return this.registerRepository.findByPeriod(accountId, start, end);
  }

  public async getComparisionData(
    accountId: string,
    startDate?: string,
    endDate?: string
  ): Promise<ComparisionDataDto[]> {
    this.logger.log(`getting register by period:${startDate}/${endDate}`);
    const { start, end } = this.mountPeriod(startDate, endDate);
    const previousStart = DateTime.now()
      .plus({ month: -1 })
      .startOf("month")
      .toJSDate();
    const previousEnd = DateTime.now()
      .plus({ month: -1 })
      .endOf("month")
      .toJSDate();

    const [actualRegisters, previousRegisters] = await Promise.all([
      await this.registerRepository.findByPeriod(accountId, start, end),
      await this.registerRepository.findByPeriod(
        accountId,
        previousStart,
        previousEnd
      ),
    ]);

    const actualGrouped = groupBy(actualRegisters, "category.name");
    const previousGrouped = groupBy(previousRegisters, "category.name");
    const comparisionDataDto = Object.keys(actualGrouped).map((key) => {
      const sumAcutalCategory = sumBy(actualGrouped[key], "value");
      const sumPreviousCategory = sumBy(previousGrouped[key], "value");
      const diff = sumAcutalCategory - sumPreviousCategory;
      const comparision: ComparisionDataDto = {
        categoryName: key,
        value: diff,
        isBetterThanLastMonth: diff < 0 ? true : false,
        percentage:
          diff < 0
            ? parseFloat(
                ((sumPreviousCategory / sumAcutalCategory - 1) * 100).toFixed(2)
              )
            : parseFloat(
                ((sumAcutalCategory / sumPreviousCategory - 1) * 100).toFixed(2)
              ),
      };
      return comparision;
    });

    return comparisionDataDto;
  }

  public async getRegisterByCategory(
    id: string,
    startDate?: string,
    endDate?: string
  ): Promise<Register[]> {
    const { start, end } = this.mountPeriod(startDate, endDate);

    return this.registerRepository.findAll();
  }

  private mountPeriod(
    startDate?: string,
    endDate?: string
  ): { start: Date; end: Date } {
    if (startDate && endDate) {
      return {
        start: DateTime.fromISO(startDate).toJSDate(),
        end: DateTime.fromISO(endDate).toJSDate(),
      };
    }

    return {
      start: DateTime.now().startOf("month").toJSDate(),
      end: DateTime.now().endOf("month").toJSDate(),
    };
  }
}
