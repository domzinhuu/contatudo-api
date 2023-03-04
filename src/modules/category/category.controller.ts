import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Category } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    return this.categoryService.saveCategory(createCategoryDto);
  }

  @Get()
  public async getAll(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }
}
