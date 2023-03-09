import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { AccountModule } from "./modules/account/account.module";
import { CategoryModule } from "./modules/category/category.module";
import { RegisterModule } from "./modules/register/register.module";
import { ConfigModule } from "@nestjs/config";
import { DashboardModule } from './modules/dashboard/dashboard.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.tpqyipj.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    ),
    UserModule,
    AccountModule,
    CategoryModule,
    RegisterModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
