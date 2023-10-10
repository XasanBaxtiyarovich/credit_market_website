import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { MailModule } from './mail/mail.module';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/models/order.model';
import { Admin } from './admins/models/admin.model';
import { AdminsModule } from './admins/admins.module';
import { HistoryModule } from './history/history.module';
import { History } from './history/models/history.model';
import { Product } from './products/models/product.model';
import { BuyData } from './buy_data/models/buy_data.model';
import { BuyDataModule } from './buy_data/buy_data.module';
import { ProductsModule } from './products/products.module';
import { Category } from './categories/models/category.model';
import { CategoriesModule } from './categories/categories.module';
import { CreditProductModule } from './credit_product/credit_product.module';
import { CreditProduct } from './credit_product/models/credit_product.model';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env', 
      isGlobal: true
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER, 
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Admin, Category, Product, BuyData, CreditProduct, Order, History],
      autoLoadModels: true,
      logging: false
    }),

    UsersModule,

    MailModule,

    AdminsModule,

    CategoriesModule,

    ProductsModule,

    BuyDataModule,

    CreditProductModule,

    OrderModule,

    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}