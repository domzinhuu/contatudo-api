import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
  @IsNotEmpty()
  buyed: string;
  @IsNotEmpty()
  spendingPlace: string;
  @IsNotEmpty()
  accountId: string;
  @IsNotEmpty()
  categoryId: string;
}
