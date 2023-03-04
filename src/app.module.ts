import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { RegisterModule } from './modules/register/register.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://domzinhuu:g0e20KUq33urHtCU@cluster0.tpqyipj.mongodb.net/contatudo?retryWrites=true&w=majority',
    ),
    UserModule,
    AccountModule,
    CategoryModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
