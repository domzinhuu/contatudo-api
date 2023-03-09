import { Module } from "@nestjs/common";
import { CategoryModule } from "../category/category.module";
import { RegisterModule } from "../register/register.module";
import { DashboardController } from "./dashboard.controller";

@Module({
  imports: [CategoryModule, RegisterModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
