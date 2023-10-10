import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { BuyData } from './models/buy_data.model';
import { BuyDataService } from './buy_data.service';
import { BuyDataController } from './buy_data.controller';

@Module({
  imports: [SequelizeModule.forFeature([BuyData]), JwtModule.register({}) ],
  controllers: [BuyDataController],
  providers: [BuyDataService],
})
export class BuyDataModule {}
