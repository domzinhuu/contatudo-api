import { IsNotEmpty, IsOptional } from "class-validator";

export class HomeRequestFiltersDto {
  @IsOptional()
  startDate?: string;
  @IsOptional()
  endDate?: string;
  @IsNotEmpty({ message: "the account id is required to search registers" })
  accountId: string;
}
