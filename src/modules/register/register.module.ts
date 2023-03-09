import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RegisterSchema } from "src/schemas/register.schema";
import { AccountModule } from "../account/account.module";
import { CategoryModule } from "../category/category.module";
import { RegisterController } from "./register.controller";
import { RegisterRepository } from "./register.repository";
import { RegisterService } from "./register.service";

@Module({
  imports: [
    AccountModule,
    CategoryModule,
    MongooseModule.forFeature([{ name: "Register", schema: RegisterSchema }]),
  ],
  controllers: [RegisterController],
  exports: [RegisterService],
  providers: [RegisterService, RegisterRepository],
})
export class RegisterModule {}
