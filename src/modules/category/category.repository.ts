import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/repository-base';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}
