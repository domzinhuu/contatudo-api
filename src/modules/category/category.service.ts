import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Category } from 'src/schemas/category.schema';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}
  public async saveCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    const exist = await this.categoryRepository.findOne({
      name: createCategoryDto.name,
    });

    if (exist) {
      throw new BadRequestException({
        message: `this category already exists`,
      });
    }

    const newCategory = await this.categoryRepository.save({
      ...createCategoryDto,
    });

    try {
      const savedCategory = await newCategory.save();
      this.logger.log(`Category created: ${JSON.stringify(savedCategory)}`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getAllCategory(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  public async getCategoryById(categoryId: string): Promise<Category> {
    return this.categoryRepository.findOne({ _id: categoryId });
  }
}
