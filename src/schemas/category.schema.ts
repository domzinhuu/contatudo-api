import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ type: String, unique: true })
  name: string;
  @Prop()
  @IsOptional()
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
