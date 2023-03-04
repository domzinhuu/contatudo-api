import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true, collection: 'accounts' })
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  description: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  contributors: User[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
