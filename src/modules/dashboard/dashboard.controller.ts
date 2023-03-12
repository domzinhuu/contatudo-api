import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { groupBy, sumBy } from "lodash";
import { DateTime } from "luxon";
import { CategoryService } from "../category/category.service";
import { RegisterService } from "../register/register.service";
import { ComparisionDataDto } from "./dto/comparision-data.dto";
import { DashboardTotalDataDto, monthList } from "./dto/dashboard-total-data.dto";
import { HomeRequestFiltersDto } from "./dto/home-request-filters.dto";

@Controller("api/v1/dashboard")
@UsePipes(ValidationPipe)
export class DashboardController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly registerService: RegisterService
  ) {}

  @Get("/getTotal")
  public async getDashboardTotalData(
    @Query() { accountId, startDate, endDate }: HomeRequestFiltersDto
  ): Promise<DashboardTotalDataDto> {
    const responseData = new DashboardTotalDataDto();
    const registers = await this.registerService.getRegisterByPeriod(
      accountId,
      startDate,
      endDate
    );
    const totalByPeriod = sumBy(registers, "value");
    const groupedByCategories = groupBy(registers, "category.name");

    const categoriesWithTotal = Object.keys(groupedByCategories).map((cat) => {
      return {
        name: cat,
        value: sumBy(groupedByCategories[cat], "value"),
      };
    });
    responseData.period = DateTime.fromISO(startDate).monthLong;

    if(!startDate){
      responseData.period = monthList[DateTime.now().monthLong]
    }
    
    responseData.totalByCategories = categoriesWithTotal;
    responseData.totalPeriod = totalByPeriod;

    return responseData;
  }
  @Get("/getComparision")
  public async getCompararision(
    @Query() { accountId, startDate, endDate }: HomeRequestFiltersDto
  ): Promise<ComparisionDataDto[]> {
    const response = await this.registerService.getComparisionData(
      accountId,
      startDate,
      endDate
    );

    return response;
  }
}
