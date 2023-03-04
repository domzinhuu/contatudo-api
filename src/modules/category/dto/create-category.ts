import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  @MaxLength(150)
  description?: string;
}
