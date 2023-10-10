import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { CreditProduct } from './models/credit_product.model';
import { CreditProductService } from './credit_product.service';
import { CreditProductController } from './credit_product.controller';

@Module({
  imports: [SequelizeModule.forFeature([CreditProduct]), JwtModule.register({}) ],
  controllers: [CreditProductController],
  providers: [CreditProductService],
})
export class CreditProductModule {}
