import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from './account.schema';
import { Category } from './category.schema';

export type RegisterDocument = HydratedDocument<Register>;

@Schema({ timestamps: true, collection: 'registers' })
export class Register {
  @Prop()
  value: number;
  @Prop()
  buyed: string;
  @Prop()
  spendingPlace: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;
  @Prop()
  boughtBy: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
