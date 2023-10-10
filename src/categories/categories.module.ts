import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { Category } from './models/category.model';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [SequelizeModule.forFeature([Category]), JwtModule.register({}) ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
