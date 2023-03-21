import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: "users" })
export class User {
  _id?: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
