import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { Register } from "src/schemas/register.schema";
import { CreateRegisterDto } from "./dtos/create-register";
import { RegisterService } from "./register.service";

@Controller("api/v1/register")
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  public async saveRegister(
    @Body() createRegisterDto: CreateRegisterDto
  ): Promise<void> {
    await this.registerService.save(createRegisterDto);
  }

  @Get()
  public async getRegisters(): Promise<Register[]> {
    return this.registerService.getRegisters();
  }

  @Get("/:id")
  public async getRegisterById(
    @Param() { id },
    @Query() { populate }
  ): Promise<Register> {
    let filterPopulate = undefined;

    if (populate) {
      filterPopulate = JSON.parse(populate);
    }
    return this.registerService.getRegisterById(id, filterPopulate);
  }

  @Get("/account/:accountId/category/:categoryId")
  public async getRegistersByCategory(
    @Param() { accountId, categoryId },
    @Query() { startDate, endDate }
  ) {
    return this.registerService.getRegisterByCategory(
      accountId,
      categoryId,
      startDate,
      endDate
    );
  }

  @Delete("/:id")
  public async deleteRegister(@Param() { id }): Promise<void> {
    return this.registerService.deleteRegister(id);
  }
}
